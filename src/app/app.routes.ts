import { Route } from '@angular/router';

import PageNotFoundComponent from './views/page-not-found.component';

export const Routes: Route[] = [
  {
    path: 'public',
    loadChildren: () => import('./views/public/public.routes'),
  },
  {
    path: 'app',
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
