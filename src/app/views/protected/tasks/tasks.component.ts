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
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ACCESS_TOKEN_KEY, CONNECTED_USER_KEY } from '@shared/constants/auth';
import { TaskGateway } from '@core/ports';
import { Task } from '@core/models';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { STATUS } from '@shared/constants/task';
import { NewTaskComponent } from './new-task/new-task.component';
import { finalize } from 'rxjs';

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
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskGateway);
  private readonly _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['task_name', 'statut', 'actions'];
  tasks: Task[] = [];
  isSubmitting = signal(false);
  isLoading = signal(false);
  options = STATUS;

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.isLoading.set(true);
    this.taskService
      .getTasks()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
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
        this._snackBar.open('La tâche a été mise à jour avec succès', 'fermer');
      }
      row.isEditing = false;
      this.isSubmitting.set(false);
    } catch (error) {
      console.log('🚀 ~ TasksComponent ~ saveField ~ error:', error);
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
}
