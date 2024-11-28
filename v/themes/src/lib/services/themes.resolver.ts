import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ThemeDataService } from './theme-data.service';


/**
 * Resolve applies blocks and style before change to a route
 */
export const ThemesResolver: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Promise<void> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (!route?.data?.['appliesStyleNames']) {
    return;
  }
  const themeDataService = inject(ThemeDataService);
  await themeDataService.loadThemes(route?.data?.['appliesStyleNames']);
};


export const themePreload = async (appliesStyleNames: Array<string>, dataService?: ThemeDataService) => {
  const themeDataService = dataService || inject(ThemeDataService);
  await themeDataService.loadThemes(appliesStyleNames);
};
