import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    loadComponent: () => import('@divine-symbology/feature').then((m) => m.Home),
    path: '',
  },
];
