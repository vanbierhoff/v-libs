import { ThemeInterface } from './theme.interface';


export interface ThemeModuleInterface {
  theme: string;
  items: Array<ThemeInterface>;
}

export interface ThemeListInterface {
  headTheme: string;
  themes: Array<ThemeInterface>;
}
