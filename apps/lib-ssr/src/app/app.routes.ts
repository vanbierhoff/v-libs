import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'theme',
    loadComponent: () =>
      import('./pages/theme/theme.component').then((m) => m.ThemeComponent),
  },
];
