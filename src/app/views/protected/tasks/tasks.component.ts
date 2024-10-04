import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
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
  finalize,
  Observable,
  of,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';

import { ACCESS_TOKEN_KEY, CONNECTED_USER_KEY } from '@shared/constants/auth';
import { TaskGateway } from '@core/ports';
import { Task } from '@core/models';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { STATUS } from '@shared/constants/task';
import { NewTaskComponent } from './new-task/new-task.component';
import { DestroyService } from '@shared/services/destroy.service';
import { ToasterService } from '@shared/services/toaster.server';
import { ErrorsService } from '@shared/services/errors.service';

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
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskGateway);
  private readonly destroy$ = inject(DestroyService);
  private readonly _snackBar = inject(ToasterService);
  private readonly errorService = inject(ErrorsService);

  displayedColumns: string[] = ['task_name', 'statut', 'actions'];
  filteredTasks = ['Tous', 'completed', 'uncompleted'];
  isSubmitting = signal(false);
  isLoading = signal(false);
  taskStatutSelected = new FormControl('Tous');
  options = STATUS;
  filteredTasks$: Observable<Task[]>;
  allTasks: Task[] = [];

  ngOnInit() {
    this.setupTaskFiltering();
  }

  setupTaskFiltering() {
    const tasks$ = this.getTasks();
    const statusFilter$ = this.taskStatutSelected.valueChanges.pipe(
      startWith('Tous')
    );

    this.filteredTasks$ = combineLatest([tasks$, statusFilter$]).pipe(
      takeUntil(this.destroy$),
      switchMap(([tasks, status]) => {
        if (status === 'Tous') {
          return of(tasks);
        } else {
          return of(tasks.filter((task) => task.statut === status));
        }
      })
    );
  }
  getTasks() {
    this.isLoading.set(true);
    return this.taskService.getTasks().pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading.set(false)),
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
    this.getTasks();
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
  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(CONNECTED_USER_KEY);
    return this.router.navigate(['/public/login']);
  }
  displayHeader(row: any) {
    if (row === 'task_name') return 'Libelle de la tâche';
    return row;
  }

  get uncompletedTasksNumber() {
    const umcompleteTasks = this.allTasks.filter(
      (task) => task.statut !== 'completed'
    ).length;

    return `${umcompleteTasks} tâches`;
  }
}
