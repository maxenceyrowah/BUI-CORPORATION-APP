import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
} from '@angular/core';
import {
  AsyncPipe,
  NgClass,
  NgFor,
  NgIf,
  UpperCasePipe,
} from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Task } from '@core/models';
import { STATUS } from '@shared/constants/task';
import { TaskNumberComponent } from './task-number.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    UpperCasePipe,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TaskNumberComponent,
    MatButtonModule,
  ],
  template: `
    <div class="overflow-hidden">
      <div
        class="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[350px] sm:max-h-[450px]"
      >
        <table class="w-full text-sm text-left text-gray-500">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10"
          >
            <tr>
              @for (column of columns; track column) {
              <th
                scope="col"
                [ngClass]="{ 'text-right': column === 'actions' }"
                class="px-3 py-2 sm:px-6 sm:py-3 font-semibold capitalize rounded-t-lg"
              >
                {{ displayColumnsName(column) | uppercase }}
              </th>
              }
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            @for (task of (filteredTasks | async) ?? []; track task?._id) {
            <tr
              class="bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <td
                class="px-3 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <input
                  *ngIf="task.isEditing"
                  [(ngModel)]="task.task_name"
                  class="w-full p-1 sm:p-2 border rounded text-sm"
                />
                <span *ngIf="!task.isEditing" class="text-sm sm:text-base">{{
                  task.task_name
                }}</span>
              </td>

              <td
                class="px-3 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <select
                  *ngIf="task.isEditing"
                  [(ngModel)]="task.statut"
                  class="w-full p-1 sm:p-2 border rounded text-sm"
                >
                  <option
                    *ngFor="let option of taskStatutOptions"
                    [value]="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <span *ngIf="!task.isEditing" class="text-sm sm:text-base">{{
                  statutLabel(task.statut)
                }}</span>
              </td>

              <td class="px-3 py-2 sm:px-6 sm:py-4 text-right">
                @if(!task.isEditing) {
                <button
                  mat-icon-button
                  matTooltip="Editer"
                  (click)="edit.emit(task)"
                  class="text-blue-500 hover:text-blue-700"
                >
                  <mat-icon class="text-base sm:text-lg">edit</mat-icon>
                </button>
                <button
                  mat-icon-button
                  matTooltip="Supprimer"
                  (click)="delete.emit(task)"
                  class="text-blue-500 hover:text-blue-700"
                >
                  <mat-icon class="text-base sm:text-lg">delete</mat-icon>
                </button>
                } @if(task.isEditing) {
                <button
                  mat-icon-button
                  matTooltip="Enregistrer"
                  (click)="save.emit(task)"
                  class="text-green-500 hover:text-green-700"
                  [disabled]="isSubmitting()"
                >
                  <mat-icon *ngIf="!isSubmitting()" class="text-base sm:text-lg"
                    >save</mat-icon
                  >
                  <mat-progress-spinner
                    *ngIf="isSubmitting()"
                    [diameter]="20"
                    [mode]="'indeterminate'"
                  ></mat-progress-spinner>
                </button>
                <button
                  mat-icon-button
                  matTooltip="Annuler"
                  (click)="cancel.emit(task)"
                  [disabled]="isSubmitting()"
                  class="text-red-500 hover:text-red-700"
                >
                  <mat-icon class="text-base sm:text-lg">close</mat-icon>
                </button>
                }
              </td>
            </tr>
            } @if(!allTasks.length) {
            <tr class="text-center">
              <td
                colspan="3"
                class="px-3 py-2 sm:px-6 sm:py-4 text-center text-gray-500 text-sm sm:text-base"
              >
                Aucune tâche disponible.
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>

      <app-task-number [taskNumber]="uncompletedTasksNumber"></app-task-number>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTableComponent {
  @Input() uncompletedTasksNumber: string;
  @Input() columns: string[];
  @Input() displayColumnsName: any;
  @Input() filteredTasks: Observable<Task[]>;
  @Input() allTasks: Task[] = [];
  @Input() taskStatutOptions: typeof STATUS;
  @Input() statutLabel: any;
  @Input() isSubmitting: Signal<boolean>;

  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<Task>();
}
