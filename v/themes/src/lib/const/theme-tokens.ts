import { InjectionToken } from '@angular/core';
import { ThemeModuleInterface } from '../models/theme-module.interface';


export const THEME_LINK = new InjectionToken<ThemeModuleInterface>('theme:link_theme');
