# @v/themes


library for lazy load any raw style as style attr or css files

## Use:

```ts
export const BaseTheme: ThemeModuleInterface = {
  theme: 'base',
  items: [
    {
      // load as css file with create link tag
      name: 'buttonCss',
      css: () => import('./styles/button.theme.css')
    },
    {
      // load as attr
      name: 'buttonBlock',
      style: () => import('./styles/button-style')
    }
  ]
};
```

attrs writes in js/ts file css in css/scss and other :
```ts
// button-style.ts
export const style = {
  color: '#2f2f2f',
  background: 'red !important',
  borderRadius: '5px',
  '--btnColor': '#710F98',
};

```

**WARNING**

For correct load files you must(can) integrate a loader for handle css/scss files.
Webpack example:
```ts
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (config) => {
  config.module.rules.push({
    test: /\.theme\.css$/i,
    use: [
      "raw-loader"
      ]
  })

  return config;
}

```


## Host:

Use :host in your file for binding styles with host el and "encapsulations"(Imitation "shadow dom") styles.
With their use your style can be bindings to only host el

Load styles:
```ts
  constructor(
  protected ElRef: ElementRef,
  protected theme: ThemeManagerService) {
  this.theme.apply('buttonCss', this.ElRef);
}
```

The library takes into account the number of style consumers and will remove the file from the <head> when there are no consumers
deleted styles:
```ts
ngOnDestroy(): void {
    this.theme.unApply('buttonCss');
  }
```
