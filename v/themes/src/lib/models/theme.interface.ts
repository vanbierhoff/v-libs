export type CssFileData = { default: string };
export type StyleData = { style: any } | CssFileData;


export type LazyCssFile = () => Promise<CssFileData>;
export type LazyStyle = () => Promise<StyleData>;

export interface ThemeInterface {
  /**
   * styles/css name as id for apply data
   */
  name: string;
  /**
   * css file for link
   */
  cssFile?: LazyCssFile;
  /**
   * styles for added to host
   */
  style?: LazyStyle;
}
