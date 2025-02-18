import { InjectionToken } from '@angular/core';
import { ThemeListInterface } from '../models/theme-module.interface';

export const THEME_LINK = new InjectionToken<ThemeListInterface>(
  'theme:link_theme'
);
