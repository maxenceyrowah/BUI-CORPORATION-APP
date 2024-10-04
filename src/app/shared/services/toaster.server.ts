import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  private readonly _snackBar = inject(MatSnackBar);

  show(msg: string) {
    return this._snackBar.open(msg, 'Fermer');
  }
}
