import { Provider, EnvironmentProviders } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const provideFirebaseService = (): Array<
  Provider | EnvironmentProviders
> => {
  return [
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ng-todo-app-ui-99907',
        appId: '1:556878020818:web:eea83e12fe22f130d72d0b',
        storageBucket: 'ng-todo-app-ui-99907.appspot.com',
        apiKey: 'AIzaSyCV4DbdlEIJc9eSoJKmjsi0ZcB2Bw-5S2g',
        authDomain: 'ng-todo-app-ui-99907.firebaseapp.com',
        messagingSenderId: '556878020818',
        measurementId: 'G-5TMYVXH3RV',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ];
};
