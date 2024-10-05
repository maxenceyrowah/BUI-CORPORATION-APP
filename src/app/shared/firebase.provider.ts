import { Provider, EnvironmentProviders } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { FirebaseAuthGateway, FirebaseTaskGateway } from '@core/adapters';
import { AuthGateway, TaskGateway } from '@core/ports';
import { environment } from 'src/environments/environment';

export const provideFirebaseService = (): Array<
  Provider | EnvironmentProviders
> => {
  return [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // Auth gateway
    {
      provide: AuthGateway,
      useClass: FirebaseAuthGateway,
    },
    // Task gateway
    {
      provide: TaskGateway,
      useClass: FirebaseTaskGateway,
    },
  ];
};
