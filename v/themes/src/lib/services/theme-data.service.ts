import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { THEME_LINK } from '../const/theme-tokens';
import { ThemeModuleInterface } from '../models/theme-module.interface';
import { CssData, StyleData, ThemeInterface } from '../models/theme.interface';
import { handleCssFile, toStyleFormat } from './theme-handler';
import { TypeThemeInterface } from '../models/type-theme.interface';
import { hasCssHash } from '../helpers/hash-generator';
import { remove } from 'lodash';


@Injectable({providedIn: 'root'})
export class ThemeDataService {

  constructor(
    @Inject(THEME_LINK) private theme: ThemeModuleInterface,
  ) {
  }


  /**
   *
   * @param name - theme/style name
   * @param elRef - ElRef target el
   * Apply style or css file by name
   */
  public async apply(name: string, elRef: ElementRef): Promise<void> {
    const theme = this.theme.items.find((item) => item.name === name);
    if (!theme) {
      console.warn(`Theme with name${name} not found`);
      return;
    }

    const {type, value} = await this.defineTypeLink(theme);
    if (type === 'style') {
      return this.setAttribute(elRef, 'style', toStyleFormat(value));
    }
    if (type === 'css') {
      this.linkCssFile({type, value}, elRef, name);
    }
  }

  public unApply(name: string) {
    this.removeByNameConsumers(name);
  }

  protected linkCssFile(theme: TypeThemeInterface, el: ElementRef, name: string): void {
    const hash = hasCssHash(name);
    if (hash) {
      this.upOrAddConsumers(name);
      return this.setAttribute(el, hash, '');
    }
    const parsedCss = handleCssFile(theme.value, name);
    if (parsedCss.hash) {
      this.setAttribute(el, parsedCss.hash, '');
    }

    const styles: HTMLStyleElement = this.doc.createElement('STYLE') as HTMLStyleElement;
    styles.innerHTML = parsedCss.style;
    styles.id = parsedCss.hash;
    this.renderer.appendChild(this.doc.head, styles);
    this.upOrAddConsumers(name, styles);

  }


  protected setAttribute(el: ElementRef, name: string, value: string = ''): void {
    this.renderer.setAttribute(el.nativeElement, name, '');
  }

  protected upOrAddConsumers(name: string, style?: HTMLStyleElement): void {
    const consumer = this.themeConsumers.find((item) => item.name === name);
    if (!consumer && style) {
      this.themeConsumers.push({
        name,
        consumers: 1,
        style
      });
      return;
    }
    if (consumer) {
      consumer.consumers += 1;
    }
  }

  protected removeByNameConsumers(name: string) {
    const consumer = this.themeConsumers.find((item) => item.name === name);
    if (!consumer) {
      return;
    }
    const count = consumer.consumers -= 1;

    if (count === 0) {
      remove(this.themeConsumers, (item) => {
        if (item.name === name) {
          item.style.remove();
          return true;
        }
        return false;
      });
    }
  }



  protected async defineTypeLink(theme: ThemeInterface): Promise<TypeThemeInterface> {
    if (theme?.style) {
      const result: StyleData = await theme.style();
      return {
        type: 'style',
        value: result.style
      };
    }
    if (theme?.css) {
      const result: CssData = await theme.css();
      return {
        type: 'css',
        value: result.default
      };
    }
    throw new Error('Styles or style block not defined');

  }


}
