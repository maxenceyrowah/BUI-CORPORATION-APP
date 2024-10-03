import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaskGateway } from '@core/ports';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [MatDialogModule, MatProgressSpinnerModule, NgIf, MatButtonModule],
  templateUrl: './delete-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteTaskComponent {
  private dialogRef = inject(MatDialogRef<DeleteTaskComponent>);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly taskService = inject(TaskGateway);
  public entryData = inject(MAT_DIALOG_DATA);

  isSubmitting = signal(false);

  async onSubmit() {
    this.isSubmitting.set(true);
    try {
      if (this.entryData?.documentID) {
        await this.taskService.deleteTask(this.entryData?.documentID);
        this._snackBar.open('Tâche supprimée avec succès', 'Fermer');
        this.isSubmitting.set(false);
        this.onCancel();
      }
    } catch (error) {
      this.isSubmitting.set(false);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
