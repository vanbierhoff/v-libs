import { Route } from '@angular/router';
import { ThemesResolver } from '../../../../v/themes/src/lib/services/themes.resolver';


export const appRoutes: Route[] = [
  {
    path: 'forms',
    loadComponent: () => import('./modules/forms/forms.component').then(c => c.FormsComponent)
  },
  {
    path: 'forms-directive',
    loadComponent: () => import('./modules/forms/form-directive/forms-directive.component').then(c => c.FormsDirectiveComponent)
  },
  {
    path: 'rx',
    loadComponent: () => import('./modules/reactions/reactions.component').then(c => c.ReactionsComponent)
  },
  {
    path: 'theme',
    resolve: {
      ThemesResolver
    },
    data: {
      appliesStyleNames: ['buttonCss', 'buttonBlock']
    },
    loadComponent: () => import('./modules/themes/views/theme.component').then(c => c.ThemeComponent)
  }

];
