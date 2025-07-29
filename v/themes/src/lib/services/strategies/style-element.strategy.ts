import { removeCssHash } from '../../helpers/hash-generator';
import { CssResourceInterface } from '../../models/css-resource.interface';
import { AppliesTheme } from '../../models/theme-data.interface';
import {
  LinkedThemeInterface,
  LinkedThemeMap,
} from '../../models/theme-manager.interface';
import { handleCssFile } from '../theme-handler';
import { ElementRef, inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export class StyleElementStrategy {
  protected readonly doc: Document = inject(DOCUMENT);

  protected readonly renderer: Renderer2;

  constructor(r: Renderer2) {
    this.renderer = r;
  }

  public linkStyle(
    name: string,
    cssResource: CssResourceInterface,
    appliesTheme: AppliesTheme,
    renderer: Renderer2,
    linkedTheme: LinkedThemeMap,
    elRef: ElementRef,
    hash: string
  ): void {
    const parsedCss: { style: string } = handleCssFile(cssResource.value, hash);

    this.setAttribute(elRef, renderer, hash, '');

    const style: HTMLStyleElement = this.createStyleElement(
      parsedCss.style,
      hash
    );
    const theme: LinkedThemeInterface = this.createLinkTheme(
      appliesTheme,
      style,
      linkedTheme
    );
    this.linkCssFileToDocument(style, renderer);
    linkedTheme.set(name, theme);
  }

  public setExistThemeToEl(elRef: ElementRef, themeName: string): void {
    this.setAttribute(elRef, this.renderer, themeName, '');
  }

  public removeByNameConsumers(name: string, linkedTheme: LinkedThemeMap) {
    const theme: LinkedThemeInterface | undefined = linkedTheme.get(
      name
    ) as LinkedThemeInterface;
    if (!theme) {
      return;
    }
    theme.consumers -= 1;
    const count = theme.consumers;

    if (count === 0) {
      theme.styleData.style.remove();
      removeCssHash(theme.styleData.linkName);
      linkedTheme.delete(name);
    }
  }

  protected createLinkTheme(
    appliesTheme: AppliesTheme,
    style: HTMLStyleElement,
    linkedTheme: LinkedThemeMap
  ): LinkedThemeInterface {
    const consumers = linkedTheme.get(appliesTheme.item.name)?.consumers;
    return {
      name: appliesTheme.item.name,
      consumers: consumers || 0,
      styleData: {
        style: style,
        linkName: appliesTheme.theme,
      },
      meta: appliesTheme.meta,
    };
  }

  protected createStyleElement(css: string, hash: string): HTMLStyleElement {
    const style: HTMLStyleElement = this.doc.createElement(
      'STYLE'
    ) as HTMLStyleElement;
    style.innerHTML = css;
    style.id = hash;
    return style;
  }

  protected setAttribute(
    el: ElementRef,
    renderer: Renderer2,
    name: string,
    value: string = ''
  ): void {
    this.renderer.setAttribute(el.nativeElement, name, value);
  }

  protected linkCssFileToDocument(
    style: HTMLStyleElement,
    renderer: Renderer2
  ) {
    renderer.appendChild(this.doc.head, style);
  }
}
