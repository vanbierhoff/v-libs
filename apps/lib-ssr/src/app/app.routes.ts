import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'theme',
    loadComponent: () =>
      import('./pages/theme/theme.component').then((m) => m.ThemeComponent),
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./pages/forms/form.component').then((m) => m.FormComponent),
  },
];
