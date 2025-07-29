import { removeCssHash } from '../../helpers/hash-generator';
import { CssResourceInterface } from '../../models/css-resource.interface';
import { AppliesTheme } from '../../models/theme-data.interface';
import {
  LinkedThemeInterface,
  LinkedThemeMap,
  LinkedThemeStringInterface,
} from '../../models/theme-manager.interface';
import { toStyleFormat } from '../theme-handler';
import { ElementRef, inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export class StringElementStrategy {
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
    _: string
  ): void {
    const styleString: string = toStyleFormat(cssResource.value);
    this.setAttribute(elRef, renderer, 'style', styleString);
    const theme: LinkedThemeStringInterface = this.createLinkTheme(
      appliesTheme,
      styleString,
      linkedTheme
    );
    linkedTheme.set(name, theme);
  }

  public createLinkTheme(
    appliesTheme: AppliesTheme,
    style: string,
    linkedTheme: LinkedThemeMap
  ): LinkedThemeStringInterface {
    const consumers: number | undefined = linkedTheme.get(
      appliesTheme.item.name
    )?.consumers;

    return {
      name: appliesTheme.item.name,
      consumers: consumers || 0,
      styleData: {
        styleAsString: style,
        linkName: appliesTheme.theme,
      },
      meta: appliesTheme.meta,
    };
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
      removeCssHash(theme.styleData.linkName);
      linkedTheme.delete(name);
    }
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
    renderer.setAttribute(el.nativeElement, name, value);
  }

  protected linkCssFileToDocument(
    style: HTMLStyleElement,
    renderer: Renderer2
  ) {
    renderer.appendChild(this.doc.head, style);
  }
}
