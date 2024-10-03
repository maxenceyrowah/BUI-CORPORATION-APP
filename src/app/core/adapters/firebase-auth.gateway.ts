import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

import { AuthGateway } from '@core/ports';
import { Auth } from '@core/models';
import { ACCESS_TOKEN_KEY } from '@shared/constants/auth';

export class FirebaseAuthGateway extends AuthGateway {
  login(credentials: Auth, fbAuth: any) {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(fbAuth, email, password);
  }

  register(credentials: Auth, fbAuth: any) {
    const { email, password } = credentials;
    return createUserWithEmailAndPassword(fbAuth, email, password);
  }

  get isLoggedIn(): boolean {
    const accesToken = localStorage.getItem(ACCESS_TOKEN_KEY) as string;
    return accesToken !== null;
  }
}
