import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FormFieldComponent } from '@shared/components';
import { TASK_STATUT } from '@shared/constants/task';

@Component({
  selector: 'app-task-filtered',
  standalone: true,
  imports: [
    FormFieldComponent,
    MatFormField,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  template: ` <div class="flex">
    <app-form-field label="Filtre des tâches">
      <div ngProjectAs="[field-content]">
        <mat-form-field appearance="outline">
          <mat-select [formControl]="taskSelected">
            @for (taskFiltered of filteredTasks; track taskFiltered.value) {
            <mat-option [value]="taskFiltered.value">{{
              taskFiltered.label
            }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>
    </app-form-field>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFilteredComponent {
  @Input() taskSelected: FormControl<TASK_STATUT | null>;
  @Input() filteredTasks: { value: string; label: string }[];
}
