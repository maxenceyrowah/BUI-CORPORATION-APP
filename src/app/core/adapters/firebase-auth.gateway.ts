import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGateway } from '@core/ports';
import { Auth as AuthModel } from '@core/models';
import { ACCESS_TOKEN_KEY, CONNECTED_USER_KEY } from '@shared/constants/auth';

export class FirebaseAuthGateway extends AuthGateway {
  private readonly fbAuth = inject(Auth);
  private readonly router = inject(Router);

  login(credentials: AuthModel) {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(this.fbAuth, email, password);
  }

  register(credentials: AuthModel) {
    const { email, password } = credentials;
    return createUserWithEmailAndPassword(this.fbAuth, email, password);
  }

  get logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(CONNECTED_USER_KEY);
    return this.router.navigate(['/public/login']);
  }

  get isLoggedIn(): boolean {
    const accesToken = localStorage.getItem(ACCESS_TOKEN_KEY) as string;
    return accesToken !== null;
  }
}
