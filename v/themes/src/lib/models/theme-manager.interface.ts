import { AppliesThemeMeta } from './theme-data.interface';

export interface LinkedThemeInterface {
  name: string;
  consumers: number;
  styleData: {
    style: HTMLStyleElement;
    linkName: string;
  };
  meta: AppliesThemeMeta;
}
