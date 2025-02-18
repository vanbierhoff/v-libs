import { AppliesThemeMeta } from './theme-data.interface';

export interface LinkedThemeInterface {
  name: string;
  consumers: number;
  styleData: Array<{
    style: HTMLStyleElement;
    linkName: string;
  }>;
  meta: AppliesThemeMeta;
}
