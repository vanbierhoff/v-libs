import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';

import { CssData, StyleData } from '../models/theme.interface';
import { handleCssFile, toStyleFormat } from './theme-handler';
import { DOCUMENT } from '@angular/common';
import { TypeThemeInterface } from '../models/type-theme.interface';
import { hasCssHash, removeCssHash } from '../helpers/hash-generator';
import { remove } from 'lodash';
import { ThemeDataService } from './theme-data.service';
import { AppliesTheme } from '../models/theme-data.service';
import { ThemeConsumersInterface } from '../models/theme-loader.interface';


@Injectable({providedIn: 'root'})
export class ThemeManagerService {

  constructor(
    protected renderer: Renderer2,
    protected themeData: ThemeDataService,
    @Inject(DOCUMENT) protected doc: Document
  ) {
  }

  protected themeConsumers: Array<ThemeConsumersInterface> = [];

  /**
   *
   * @param name - theme/style name
   * @param elRef - ElRef target el
   * Apply style or css file by name
   */
  public async apply(name: string, elRef: ElementRef): Promise<void> {
    const themes = this.themeData.getApplies(name);

    if (!themes) {
      console.warn(`Theme with name${name} not found`);
      return;
    }

    const styleData: ThemeConsumersInterface['styleData'] = [];
    for await (const theme of themes) {
      const {type, value} = await this.defineTypeLink(theme);
      if (type === 'style') {
        return this.setAttribute(elRef, 'style', toStyleFormat(value));
      }
      if (type === 'css') {
        const linkName: string = theme.theme + '-' + name;
        const style = this.linkCssFile({type, value}, elRef, theme.theme + '-' + name);
        if (style) {
          styleData.push({style, linkName});
        }
      }
    }

    if (styleData.length > 0) {
      this.upOrAddConsumers(name, styleData);
    } else {
      this.upOrAddConsumers(name);
    }
  }

  public unApply(name: string) {
    this.removeByNameConsumers(name);
  }

  protected linkCssFile(theme: TypeThemeInterface, el: ElementRef,  linkName: string): HTMLStyleElement | void {
    const hash = hasCssHash(linkName);
    if (hash) {
      return this.setAttribute(el, hash, '');
    }
    const parsedCss = handleCssFile(theme.value, linkName);
    if (parsedCss.hash) {
      this.setAttribute(el, parsedCss.hash, '');
    }

    const style: HTMLStyleElement = this.doc.createElement('STYLE') as HTMLStyleElement;
    style.innerHTML = parsedCss.style;
    style.id = parsedCss.hash;
    this.renderer.appendChild(this.doc.head, style);
    return style;
  }


  protected setAttribute(el: ElementRef, name: string, value: string = ''): void {
    this.renderer.setAttribute(el.nativeElement, name, '');
  }

  protected upOrAddConsumers(name: string, styleData?: ThemeConsumersInterface['styleData']): void
  protected upOrAddConsumers(name: string, styleData: ThemeConsumersInterface['styleData']): void {
    const consumer = this.themeConsumers.find((item) => item.name === name);

    if (!consumer && styleData) {
      this.themeConsumers.push({
        name,
        consumers: 1,
        styleData
      });
      return;
    }
    if (consumer) {
      consumer.consumers += 1;
      if (styleData) {
        consumer.styleData.push(...styleData);
      }
    }
  }

  protected removeByNameConsumers(name: string) {
    const consumer = this.themeConsumers.find((item) => item.name === name);
    console.log(this.themeConsumers);
    if (!consumer) {
      return;
    }
    const count = consumer.consumers -= 1;

    if (count === 0) {
      remove(this.themeConsumers, (item) => {
        if (item.name === name) {
          item.styleData.forEach((styleData) => {
            styleData.style.remove();
            removeCssHash(styleData.linkName);
          });
          return true;
        }
        return false;
      });
    }
  }


  protected async defineTypeLink(theme: AppliesTheme): Promise<TypeThemeInterface> {
    if (theme?.item.style) {
      const result: StyleData = await theme.item.style();
      return {
        type: 'style',
        value: result.style
      };
    }
    if (theme?.item.css) {
      const result: CssData = await theme.item.css();
      return {
        type: 'css',
        value: result.default
      };
    }
    throw new Error('Styles or style block not defined');
  }
}
