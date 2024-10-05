import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-number',
  standalone: true,
  imports: [],
  template: ` <div class="mt-3 sm:mt-5 shadow-md text-right p-2 sm:p-4">
    <span class="text-sm sm:text-base"
      >Nombre de tâches incomplètes:
      <span class="text-blue-500">{{ taskNumber }}</span></span
    >
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskNumberComponent {
  @Input() taskNumber: string;
}
