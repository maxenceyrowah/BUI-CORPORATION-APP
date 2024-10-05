import { inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { ToasterService } from './toaster.server';

const errorMessages: { [k: string]: string } = {
  'auth/invalid-credential': 'Veuillez vérifier vos informations de connexion.',
  'auth/user-not-found': "L'utilisateur n'a pas été trouvé.",
  'auth/wrong-password': 'Mot de passe incorrect.',
  'auth/invalid-email': 'Adresse e-mail invalide.',
  'auth/email-already-in-use': 'Adresse e-mail déjà utilisé.',
  'auth/email-already-exists':
    "L'adresse e-mail fournie est déjà utilisée par un utilisateur existant.",
};

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  private readonly _snackBar = inject(ToasterService);
  private defaultMsg =
    "Une erreur s'est produite. Veuillez réessayer plus tard.";

  handleError(error: any) {
    this._snackBar.show(this.getErrorMessage(error?.code));
    return throwError(() => error);
  }
  private getErrorMessage(error: string) {
    if (!errorMessages[error]) return this.defaultMsg;
    return errorMessages[error];
  }
}
