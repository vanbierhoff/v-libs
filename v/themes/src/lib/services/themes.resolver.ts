import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ThemeDataService } from './theme-data.service';
import { ThemeManagerService } from './theme-manager.service';

/**
 * Resolve applies blocks and style before change to a route
 * @description Usage if you need preload styles or css after go to route
 */
export const ThemesResolver: (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => Promise<void> = async (
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
export const ThemePreload = async (appliesStyleNames: Array<string>) => {
  const themeService: ThemeManagerService = inject(ThemeManagerService);
  for await (const name of appliesStyleNames) {
    await themeService.linkThemeCss(name);
  }
};

/**
 * Resolve applies blocks and style before change to a route
 * @description Usage if you need preload styles or css after go to route
 */
export const ThemesPreloadResolver: (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => Promise<void> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (!route?.data?.['appliesStyleNames']) {
    return;
  }
  const themeManager: ThemeManagerService = inject(ThemeManagerService);
  const applies: string[] = route?.data?.['appliesStyleNames'];
  if (!applies) {
    return;
  }
  for await (const name of applies) {
    await themeManager.linkThemeCss(name);
  }
};
