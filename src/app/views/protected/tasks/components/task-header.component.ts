import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [MatButtonModule],
  template: ` <div
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6"
  >
    <div class="mb-4 sm:mb-0">
      <p class="text-xl sm:text-2xl font-bold">Liste des tâches</p>
    </div>
    <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
      <button
        mat-flat-button
        class="w-full sm:w-auto rounded-[8px]"
        (click)="addTask.emit()"
      >
        Ajouter une tâche
      </button>
      <button
        mat-raised-button
        class="w-full sm:w-auto rounded-[8px]"
        (click)="logout.emit()"
      >
        Se déconnecter
      </button>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHeaderComponent {
  @Output() addTask = new EventEmitter<any>();
  @Output() logout = new EventEmitter<any>();
}
