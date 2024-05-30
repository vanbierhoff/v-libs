import { Route } from '@angular/router';


export const appRoutes: Route[] = [
  {
    path: 'forms',
    loadComponent: () => import('./modules/forms/forms.component').then(c => c.FormsComponent)
  },
  {
    path: 'theme',
    loadComponent: () => import('./modules/themes/views/theme.component').then(c => c.ThemeComponent)
  }

];
