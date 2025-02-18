import { ThemeInterface } from './theme.interface';

export interface AppliesTheme {
  theme: string;
  item: ThemeInterface;
  meta: AppliesThemeMeta;
}

export interface AppliesThemeMeta {
  isPermanent: boolean;
}
