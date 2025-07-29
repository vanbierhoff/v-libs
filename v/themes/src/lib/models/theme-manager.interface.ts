import { AppliesThemeMeta } from './theme-data.interface';

export type LinkedThemesMapInterface = Map<string, LinkedThemeInterface>;

export type LinkedThemeMap = Map<
  string,
  LinkedThemeInterface | LinkedThemeStringInterface
>;

export interface LinkedThemeInterface {
  name: string;
  consumers: number;
  styleData: {
    style: HTMLStyleElement;
    linkName: string;
  };
  meta: AppliesThemeMeta;
}

export interface LinkedThemeStringInterface {
  name: string;
  consumers: number;
  styleData: {
    styleAsString: string;
    linkName: string;
  };
  meta: AppliesThemeMeta;
}
