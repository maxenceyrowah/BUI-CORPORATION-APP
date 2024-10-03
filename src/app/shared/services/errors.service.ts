import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  private readonly _snackBar = inject(MatSnackBar);

  handleError(error: any): Observable<never> {
    this._snackBar.open(this.getErrorMessage(error));
    return throwError(() => error);
  }
  private getErrorMessage(error: any): string {
    return 'An unexpected error occurred';
  }
}
