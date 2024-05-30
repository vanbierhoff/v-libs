export interface ThemeConsumersInterface {
  name: string,
  consumers: number,
  styleData: Array<{
    style: HTMLStyleElement,
    linkName: string
  }>
}
