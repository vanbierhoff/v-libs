import { ThemeInterface } from './theme.interface';

export interface AppliesTheme {
  theme: string;
  item: ThemeInterface;
  meta?: AppliesThemeMeta;
}

export interface AppliesThemeMeta {
  isPermanent: boolean;
}

export interface PreloadThemeList {
  theme: string;
  items: Array<PreloadTheme>;
  themes?: Array<PreloadTheme>;
}

export interface PreloadTheme {
  /**
   * styles/css name as id for apply data
   */
  name: string;
  /**
   * loaded css file
   */
  css?: string;
  /**
   * loaded styles
   */
  style?: string;
}
