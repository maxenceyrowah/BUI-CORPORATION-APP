import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

import { AuthGateway } from '@core/ports';
import { Auth as AuthModel } from '@core/models';
import { ACCESS_TOKEN_KEY } from '@shared/constants/auth';
import { inject } from '@angular/core';

export class FirebaseAuthGateway extends AuthGateway {
  private readonly fbAuth = inject(Auth);

  login(credentials: AuthModel) {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(this.fbAuth, email, password);
  }

  register(credentials: AuthModel) {
    const { email, password } = credentials;
    return createUserWithEmailAndPassword(this.fbAuth, email, password);
  }

  get isLoggedIn(): boolean {
    const accesToken = localStorage.getItem(ACCESS_TOKEN_KEY) as string;
    return accesToken !== null;
  }
}
