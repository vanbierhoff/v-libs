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
import { CssResourceInterface } from '../models/css-resource.interface';
import { hasCssHash, removeCssHash } from '../helpers/hash-generator';
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
  protected linkedThemeMap: Map<string, LinkedThemeInterface> = new Map<
    string,
    LinkedThemeInterface
  >();

  /**
   *
   * @param name - theme/style name
   * @param elRef - ElRef target el
   * Apply style or css file by name
   */
  public async apply(name: string, elRef: ElementRef): Promise<void> {
    const theme: AppliesTheme | void = this.themeData.getApplyTheme(name);
    if (!theme) {
      return;
    }
    const cssResource: CssResourceInterface =
      await this.themeData.loadCssResource(theme);

    const hash = hasCssHash(name);
    if (this.isThemeLink(name) && hash) {
      this.setAttribute(elRef, hash, '');
      this.upConsumers(name);
      return;
    }

    if (cssResource.type === 'style') {
      this.setAttribute(elRef, 'style', toStyleFormat(cssResource.value));
      return;
    }

    const parsedCss = handleCssFile(cssResource.value, name);

    if (parsedCss.hash) {
      this.setAttribute(elRef, parsedCss.hash, '');
    }

    if (this.isThemeLink(name)) {
      this.upConsumers(name);
      return;
    }

    const style: HTMLStyleElement = this.createStyleElement(
      parsedCss.style,
      parsedCss.hash
    );

    this.linkCssFileToDocument(style);

    const linkTheme = this.createLinkTheme(theme, style);
    this.linkedTheme.push(linkTheme);
    this.upConsumers(name);
  }

  public unApply(name: string) {
    this.removeByNameConsumers(name);
  }

  protected linkCssFileToDocument(style: HTMLStyleElement) {
    this.renderer.appendChild(this.doc.head, style);
  }

  protected isThemeLink(name: string): boolean {
    return this.linkedTheme.some((theme) => theme.name === name);
  }

  protected createLinkTheme(
    appliesTheme: AppliesTheme,
    style: HTMLStyleElement
  ) {
    return {
      name: appliesTheme.item.name,
      consumers: 0,
      styleData: [
        {
          style: style,
          linkName: this.getThemeLinkName(appliesTheme, appliesTheme.item.name),
        },
      ],
      meta: appliesTheme.meta,
    };
  }

  protected upConsumers(name: string): void {
    const theme = this.linkedTheme.find((theme) => theme.name === name);
    if (!theme) {
      return;
    }

    theme.consumers = theme.consumers + 1;
  }

  protected setAttribute(
    el: ElementRef,
    name: string,
    value: string = ''
  ): void {
    console.log(el);
    this.renderer.setAttribute(el.nativeElement, name, value);
  }

  protected createStyleElement(css: string, hash: string) {
    const style: HTMLStyleElement = this.doc.createElement(
      'STYLE'
    ) as HTMLStyleElement;
    style.innerHTML = css;
    style.id = hash;
    return style;
  }

  // Унести в themeData и назвать иначе
  // сделать метод для определения типа cssFile или style для apply
  protected async defineTypeLink(
    theme: AppliesTheme
  ): Promise<CssResourceInterface> {
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

  protected removeByNameConsumers(name: string) {
    const consumer = this.linkedTheme.find((item) => item.name === name);
    if (!consumer) {
      return;
    }
    consumer.consumers -= 1;
    const count = consumer.consumers;

    if (count === 0) {
      const index = this.linkedTheme.findIndex((item) => item.name === name);
      const linkedTheme = this.linkedTheme[index];
      if (!linkedTheme) {
        return;
      }
      linkedTheme.styleData.forEach((style) => {
        style.style.remove();
        removeCssHash(style.linkName);
      });
      this.linkedTheme.splice(index, 1);
    }
  }

  protected getThemeLinkName(theme: AppliesTheme, name: string): string {
    return theme.theme + '-' + name;
  }
}
