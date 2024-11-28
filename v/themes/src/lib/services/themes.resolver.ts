import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ThemeDataService } from './theme-data.service';


/**
 * Resolve applies blocks and style before change to a route
 * @description Usage if you need preload styles or css after go to route
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

/**
 *
 * @param appliesStyleNames uploaded name themes
 * @param dataService - theme data service
 * Function for styles preload  can be used in guards,services or APP_INITIALIZER tokens or etc
 * @description Usage if you need preload styles or css after go to route
 */
export const themePreload = async (appliesStyleNames: Array<string>, dataService?: ThemeDataService) => {
  const themeDataService = dataService || inject(ThemeDataService);
  await themeDataService.loadThemes(appliesStyleNames);
};
