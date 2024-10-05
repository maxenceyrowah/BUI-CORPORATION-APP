import { NgIf, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { TaskGateway } from '@core/ports';
import { FormFieldComponent } from '@shared/components/form-field-component';
import { STATUS, TASK_STATUT } from '@shared/constants/task';
import { ErrorsService } from '@shared/services/errors.service';
import { ToasterService } from '@shared/services/toaster.server';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    MatDialogModule,
    MatProgressSpinnerModule,
    NgIf,
    FormFieldComponent,
    MatFormField,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    UpperCasePipe,
    MatButtonModule,
  ],
  templateUrl: './new-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent {
  private readonly taskService = inject(TaskGateway);
  private readonly _snackBar = inject(ToasterService);
  private readonly errorService = inject(ErrorsService);
  private dialogRef = inject(MatDialogRef<NewTaskComponent>);
  public entryData = inject(MAT_DIALOG_DATA);

  status = STATUS;
  isSubmitting = signal(false);
  task_name = new FormControl('');
  statut = new FormControl(TASK_STATUT.NON_TERMINE);

  async onSubmit() {
    if (!this.task_name.value) {
      this._snackBar.show('Veuillez saisir le nom de la tâche');
      return;
    }

    this.isSubmitting.set(true);
    try {
      const payload = {
        task_name: this.task_name.value as string,
        statut: this.statut.value as string,
        isEditing: false,
      };
      const createdTask = await this.taskService.postTask(payload);

      if (createdTask) {
        await this.taskService.putTask(payload, createdTask.id);
      }
      this.isSubmitting.set(false);
      this.onCancel();
    } catch (error) {
      this.errorService.handleError(error);
      this.isSubmitting.set(false);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
