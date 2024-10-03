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
  ],
};
