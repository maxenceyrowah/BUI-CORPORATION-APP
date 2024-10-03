import { Route } from '@angular/router';

import PageNotFoundComponent from './views/page-not-found.component';
import { authGuard } from '@shared/guards/auth.guard';
import { noAuthGuard } from '@shared/guards/no-auth.guard';

export const Routes: Route[] = [
  {
    path: 'public',
    canMatch: [() => noAuthGuard()],
    loadChildren: () => import('./views/public/public.routes'),
  },
  {
    path: 'app',
    canMatch: [() => authGuard()],
    loadChildren: () => import('./views/protected/protected.routes'),
  },
  {
    path: '',
    redirectTo: '/public/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
