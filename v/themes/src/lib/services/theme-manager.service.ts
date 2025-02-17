import {
  ElementRef,
  inject,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { CssFileData, StyleData } from '../models/theme.interface';
import { handleCssFile, toStyleFormat } from './theme-handler';
import { DOCUMENT } from '@angular/common';
import { TypeLinkThemeInterface } from '../models/type-link-theme.interface';
import { hasCssHash, removeCssHash } from '../helpers/hash-generator';
import { remove } from 'lodash';
import { ThemeDataService } from './theme-data.service';
import { AppliesTheme } from '../models/theme-data.interface';
import { LinkedThemeInterface } from '../models/theme-manager.interface';

@Injectable({ providedIn: 'root' })
export class ThemeManagerService {
  protected rendererFactory: RendererFactory2 = inject(RendererFactory2);
  protected renderer: Renderer2 = this.rendererFactory.createRenderer(
    null,
    null
  );
  protected themeData: ThemeDataService = inject(ThemeDataService);
  protected doc: Document = inject(DOCUMENT);
  protected linkedTheme: Array<LinkedThemeInterface> = [];

  /**
   *
   * @param name - theme/style name
   * @param elRef - ElRef target el
   * Apply style or css file by name
   */
  public async apply(name: string, elRef: ElementRef): Promise<void> {
    const hash = hasCssHash(name + '-' + name);
    if (this.isThemeLink(name) && hash) {
      console.log('set theme link');
      // нужен up consumers
      return this.setAttribute(elRef, hash, '');
    }

    const themes: AppliesTheme[] | void = this.themeData.getApplies(name);

    if (!themes) {
      console.warn(`Theme with name ${name} not found`);
      return;
    }

    const styleData: LinkedThemeInterface['styleData'] = [];
    for await (const theme of themes) {
      const { type, value } = await this.defineTypeLink(theme);
      if (type === 'style') {
        return this.setAttribute(elRef, 'style', toStyleFormat(value));
      }
      if (type === 'css') {
        const linkName: string = theme.theme + '-' + name;
        const style = this.linkCssFile(
          { type, value },
          elRef,
          theme.theme + '-' + name
        );
        if (style) {
          styleData.push({ style, linkName });
        }
      }
    }

    if (styleData.length > 0) {
      this.upOrAddConsumers(name, styleData);
    } else {
      this.upOrAddConsumers(name);
    }
  }

  public async applyPermanentStyle(name: string) {
    const themes: AppliesTheme[] | void = this.themeData.getApplies(name);
    if (!themes) {
      return;
    }
    const theme: AppliesTheme = themes[0];
    const { type, value } = await this.defineTypeLink(theme);
    // this.linkCssFileToDocument(
    //   { type, value },
    //   this.getThemeLinkName(theme, name)
    // );
  }

  public unApply(name: string) {
    this.removeByNameConsumers(name);
  }

  protected linkCssFile(
    theme: TypeLinkThemeInterface,
    el: ElementRef,
    linkName: string
  ): HTMLStyleElement | void {
    const hash = hasCssHash(linkName);
    if (hash) {
      return this.setAttribute(el, hash, '');
    }
    const parsedCss = handleCssFile(theme.value, linkName);
    if (parsedCss.hash) {
      this.setAttribute(el, parsedCss.hash, '');
    }
    return this.linkCssFileToDocument(parsedCss.style, parsedCss.hash);
  }

  protected linkCssFileToDocument(css: string, hash: string) {
    const style: HTMLStyleElement = this.doc.createElement(
      'STYLE'
    ) as HTMLStyleElement;
    style.innerHTML = css;
    style.id = hash;
    this.renderer.appendChild(this.doc.head, style);
    return style;
  }

  protected isThemeLink(name: string): boolean {
    return this.linkedTheme.some((theme) => theme.name === name);
  }

  protected setAttribute(
    el: ElementRef,
    name: string,
    value: string = ''
  ): void {
    this.renderer.setAttribute(el.nativeElement, name, value);
  }

  // todo deprecated удалить и замнеить на другой api
  protected upOrAddConsumers(
    name: string,
    styleData?: LinkedThemeInterface['styleData']
  ): void;
  protected upOrAddConsumers(
    name: string,
    styleData: LinkedThemeInterface['styleData']
  ): void {
    const consumer = this.linkedTheme.find((item) => item.name === name);

    if (!consumer && styleData) {
      this.linkedTheme.push({
        name,
        consumers: 1,
        styleData,
      });
      return;
    }
    if (consumer) {
      consumer.consumers = consumer.consumers + 1;
      if (styleData) {
        consumer.styleData.push(...styleData);
      }
    }
  }

  protected upThemeConsumerCounter(theme: LinkedThemeInterface): void {
    const consumer = this.linkedTheme.find((item) => item.name === theme.name);
    if (!consumer) {
      return;
    }
    consumer.consumers = consumer.consumers + 1;
  }

  protected removeByNameConsumers(name: string) {
    const consumer = this.linkedTheme.find((item) => item.name === name);

    if (!consumer) {
      console.log('con', consumer, 'name:', name);
      return;
    }
    consumer.consumers -= 1;
    const count = consumer.consumers;
    console.log(count);

    if (count === 0) {
      remove(this.linkedTheme, (item) => {
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

  protected async defineTypeLink(
    theme: AppliesTheme
  ): Promise<TypeLinkThemeInterface> {
    if (theme?.item.style) {
      const result: StyleData = await theme.item.style();
      return {
        type: 'style',
        value: result,
      };
    }
    if (theme?.item.cssFile) {
      const result: CssFileData = await theme.item.cssFile();
      return {
        type: 'css',
        value: result.default,
      };
    }
    throw new Error('Styles or style block not defined');
  }

  protected getThemeLinkName(theme: AppliesTheme, name: string): string {
    return theme.theme + '-' + name;
  }
}
