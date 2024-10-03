import { Routes } from '@angular/router';

export default [
  {
    path: 'gestions-taches',
    loadComponent: () =>
      import('./tasks/tasks.component').then((m) => m.TasksComponent),
  },
] as Routes;
