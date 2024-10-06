import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import {
  AsyncPipe,
  NgClass,
  NgFor,
  NgIf,
  UpperCasePipe,
} from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormFieldComponent } from '@shared/components/form-field-component';
import {
  combineLatest,
  Observable,
  of,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';

import { AuthGateway, TaskGateway } from '@core/ports';
import { Task } from '@core/models';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import {
  TASK_STATUS_OPTIONS,
  TASK_STATUT,
  TASKS_COLUMNS,
  TASKS_FILTER_OPTIONS,
} from '@shared/constants/task';
import { NewTaskComponent } from './new-task/new-task.component';
import { DestroyService } from '@shared/services/destroy.service';
import { ToasterService } from '@shared/services/toaster.server';
import { ErrorsService } from '@shared/services/errors.service';
import { TaskTableComponent } from './components/task-table.component';
import { TaskFilteredComponent } from './components/task-filtered.component';
import { TaskHeaderComponent } from './components/task-header.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    NgIf,
    UpperCasePipe,
    NgClass,
    FormsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatSelectModule,
    ReactiveFormsModule,
    FormFieldComponent,
    TaskTableComponent,
    TaskFilteredComponent,
    TaskHeaderComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly authGateway = inject(AuthGateway);
  private readonly taskService = inject(TaskGateway);
  private readonly destroy$ = inject(DestroyService);
  private readonly _snackBar = inject(ToasterService);
  private readonly errorService = inject(ErrorsService);

  isSubmitting = signal(false);

  taskStatutSelected = new FormControl(TASK_STATUT.TOUS);
  displayedColumns = TASKS_COLUMNS;
  filteredTasks = TASKS_FILTER_OPTIONS;
  options = TASK_STATUS_OPTIONS;
  filteredTasks$: Observable<Task[]>;
  allTasks: Task[] = [];

  ngOnInit() {
    this.setupTaskFiltering();
  }

  setupTaskFiltering() {
    const tasks$ = this.getTasks();
    const statusFilter$ = this.taskStatutSelected.valueChanges.pipe(
      startWith(TASK_STATUT.TOUS)
    );

    this.filteredTasks$ = combineLatest([tasks$, statusFilter$]).pipe(
      takeUntil(this.destroy$),
      switchMap(([tasks, status]) => {
        if (status === TASK_STATUT.TOUS) {
          return of(tasks);
        } else {
          return of(tasks.filter((task) => task.statut === status));
        }
      })
    );
  }
  getTasks() {
    return this.taskService.getTasks().pipe(
      takeUntil(this.destroy$),
      switchMap((tasks) => {
        this.allTasks = tasks;
        return of(tasks);
      })
    );
  }
  openAddTask() {
    this.dialog.open(NewTaskComponent, { disableClose: true, width: '20rem' });
  }
  editField(row: any) {
    row.isEditing = true;
  }
  async saveField(row: any) {
    this.isSubmitting.set(true);
    try {
      if (row?._id) {
        const { _id, ...rest } = row;
        rest['isEditing'] = false;
        await this.taskService.putTask(rest, _id);
        this._snackBar.show('La tâche a été mise à jour avec succès');
      }
      row.isEditing = false;
      this.isSubmitting.set(false);
    } catch (error) {
      this.errorService.handleError(error);
      this.isSubmitting.set(false);
    }
  }
  cancelEditField(row: any) {
    row.isEditing = false;
    this.setupTaskFiltering();
  }
  deleteTask(row: any) {
    this.dialog
      .open(DeleteTaskComponent, {
        disableClose: true,
        data: { documentID: row?._id },
      })
      .afterClosed()
      .subscribe(() => {
        this.getTasks();
        row.isEditing = false;
      });
  }
  async logout() {
    await this.authGateway.logout;
  }
  displayTableHeader(row: any) {
    if (row === 'task_name') return 'Libelle de la tâche';
    return row;
  }

  get uncompletedTasksNumber() {
    const umcompleteTasks = this.allTasks.filter(
      (task) => task.statut !== TASK_STATUT.TERMINE
    ).length;

    return `${umcompleteTasks} tâches`;
  }

  adaptiveStatutLabel(statut: string) {
    return statut === TASK_STATUT.NON_TERMINE ? 'Non terminé' : 'Terminé';
  }
}
