import { ThemeInterface } from './theme.interface';


export interface ThemeModuleInterface {
  theme: string;
  items: Array<ThemeInterface>;
}

export interface ThemeListInterface {
  theme: string;
  items: Array<ThemeInterface>;
  themes?: Array<ThemeModuleInterface>;
}
