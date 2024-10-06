import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideFirebaseService } from '@shared/firebase.provider';
import { Routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(Routes),
    provideAnimationsAsync(),

    //firebase provider
    provideFirebaseService(),

    // {
    //   provide: TaskGateway,
    //   useValue: new InMemoryTaskGateway().withTasks([
    //     {
    //       _id: '1',
    //       task_name: 'TASK 001',
    //       isEditing: false,
    //       statut: 'uncompleted',
    //     },
    //     {
    //       _id: '2',
    //       task_name: 'TASK 002',
    //       isEditing: false,
    //       statut: 'uncompleted',
    //     },
    //   ]),
    // },
    // { provide: AuthGateway, useValue: new InMemoryAuthGateway() },
  ],
};
