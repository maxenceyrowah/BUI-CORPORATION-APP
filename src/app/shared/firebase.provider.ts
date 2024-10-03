import { Provider, EnvironmentProviders } from '@angular/core';
import {
  provideFirebaseApp,
  initializeApp,
  FirebaseAppModule,
} from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { FirebaseAuthGateway } from '@core/adapters';
import { AuthGateway } from '@core/ports';
import { environment } from 'src/environments/environment';

export const provideFirebaseService = (): Array<
  Provider | EnvironmentProviders
> => {
  return [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    {
      provide: AuthGateway,
      useClass: FirebaseAuthGateway,
    },
  ];
};
