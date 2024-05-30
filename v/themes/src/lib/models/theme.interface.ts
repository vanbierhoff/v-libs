export type CssData = { default: string };
export type StyleData = { style: any };

export type LazyCss = () => Promise<CssData>;
export type LazyStyle = () => Promise<StyleData>;

export interface ThemeInterface {
  /**
   * styles/css name as id for apply data
   */
  name: string;
  /**
   * css file for link
   */
  css?: LazyCss;
  /**
   * styles for added to host
   */
  style?: LazyStyle;
}
