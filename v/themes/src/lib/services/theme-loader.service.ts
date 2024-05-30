import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { THEME_LINK } from '../const/theme-tokens';
import { ThemeModuleInterface } from '../models/theme-module.interface';
import { CssData, StyleData, ThemeInterface } from '../models/theme.interface';
import { handleCssFile, toStyleFormat } from './theme-handler';
import { DOCUMENT } from '@angular/common';
import { TypeThemeInterface } from '../models/type-theme.interface';
import { hasCssHash, removeCssHash } from '../helpers/hash-generator';
import { remove } from 'lodash';
import { ThemeDataService } from './theme-data.service';
import { AppliesTheme } from '../models/theme-data.service';


@Injectable({providedIn: 'root'})
export class ThemeLoaderService {

  constructor(
    protected renderer: Renderer2,
    protected themeData: ThemeDataService,
    @Inject(DOCUMENT) protected doc: Document
  ) {
  }

  protected themeConsumers: Array<{
    name: string,
    consumers: number,
    style: Array<HTMLStyleElement>,
    linkNames: Array<string>
  }> = [];

  /**
   *
   * @param name - theme/style name
   * @param elRef - ElRef target el
   * Apply style or css file by name
   */
  public async apply(name: string, elRef: ElementRef): Promise<void> {
    const themes = this.themeData.getApplies(name);
    console.log(themes);

    if (!themes) {
      console.warn(`Theme with name${name} not found`);
      return;
    }
    const styles: Array<HTMLStyleElement> = [];
    const linkNames: Array<string> = [];
    for await (const theme of themes) {
      const {type, value} = await this.defineTypeLink(theme);
      if (type === 'style') {
        return this.setAttribute(elRef, 'style', toStyleFormat(value));
      }
      if (type === 'css') {
        const linkName = theme.theme + '-' + name;
        const style = this.linkCssFile({type, value}, elRef, name, theme.theme + '-' + name);
        if (style) {
          styles.push(style);
          linkNames.push(linkName);
        }
      }
    }

    if (styles.length > 0) {
      this.upOrAddConsumers(name, styles, linkNames);
    } else {
      this.upOrAddConsumers(name);
    }
  }

  public unApply(name: string) {
    this.removeByNameConsumers(name);
  }

  protected linkCssFile(theme: TypeThemeInterface, el: ElementRef, name: string, linkName: string): HTMLStyleElement | void {
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

  protected upOrAddConsumers(name: string, style?: Array<HTMLStyleElement>, names?: Array<string>): void {
    const consumer = this.themeConsumers.find((item) => item.name === name);

    if (!consumer && style) {
      this.themeConsumers.push({
        name,
        consumers: 1,
        style: [...style],
        linkNames: [...names!]
      });
      return;
    }
    if (consumer) {
      consumer.consumers += 1;
      if (style) {
        consumer.style.push(...style);
        consumer.linkNames.push(...names!);
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
          item.style.forEach((style) => {
            style.remove();
          });
          item.linkNames.forEach((linkName) => {
            removeCssHash(linkName);
          })
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
