import {
  ElementRef,
  inject,
  Injectable,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { handleCssFile, toStyleFormat } from './theme-handler';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { CssResourceInterface } from '../models/css-resource.interface';
import { removeCssHash } from '../helpers/hash-generator';
import { ThemeDataService } from './theme-data.service';
import { AppliesTheme } from '../models/theme-data.interface';
import { LinkedThemeInterface } from '../models/theme-manager.interface';
import { ThemeSsrHydrator } from './theme-ssr.hydrator';

@Injectable({ providedIn: 'root' })
export class ThemeManagerService implements OnDestroy {
  protected rendererFactory: RendererFactory2 = inject(RendererFactory2);
  protected platformId = inject(PLATFORM_ID);
  protected ssrHydrator: ThemeSsrHydrator = inject(ThemeSsrHydrator);
  protected isServer: boolean = isPlatformServer(this.platformId);

  constructor() {
    const linkedThemes = this.ssrHydrator.hydrateTheme();
    if (linkedThemes) {
      this.linkedTheme = linkedThemes;
    }
  }

  protected renderer: Renderer2 = this.rendererFactory.createRenderer(
    null,
    null
  );
  protected themeData: ThemeDataService = inject(ThemeDataService);
  protected doc: Document = inject(DOCUMENT);
  protected linkedTheme: Map<string, LinkedThemeInterface> = new Map<
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
    const hash = name;
    if (this.isThemeLink(name)) {
      this.setExistTheme(elRef, hash, name);
      return;
    }
    this.linkedTheme.set(name, { consumers: 0 } as LinkedThemeInterface);
    const cssResource: CssResourceInterface =
      await this.themeData.loadCssResource(theme);

    // TODO сейвить стили как строку в linked и аплаить без асинхронности
    if (cssResource.type === 'style') {
      this.setAttribute(elRef, 'style', toStyleFormat(cssResource.value));
      return;
    }

    const parsedCss = handleCssFile(cssResource.value, hash);

    if (hash) {
      this.setAttribute(elRef, hash, '');
    }

    const style: HTMLStyleElement = this.createStyleElement(
      parsedCss.style,
      hash
    );

    this.linkCssFileToDocument(style);

    const linkTheme = this.createLinkTheme(theme, style);
    this.linkedTheme.set(name, linkTheme);
    this.upConsumers(name);
    if (!this.isServer) {
      return;
    }
    this.ssrHydrator.saveToStateTheme(this.linkedTheme);
  }

  public unApply(name: string) {
    if (this.isServer) {
      return;
    }
    this.removeByNameConsumers(name);
  }

  public async linkThemeCss(name: string) {
    const applies = this.themeData.getApplyTheme(name);
    if (!applies) {
      return;
    }
    if (this.isThemeLink(name)) {
      return;
    }

    const hash = name;

    const cssResource: CssResourceInterface =
      await this.themeData.loadCssResource(applies);
    const parsedCss = handleCssFile(cssResource.value, hash);

    const style: HTMLStyleElement = this.createStyleElement(
      parsedCss.style,
      hash
    );
    this.linkedTheme.set(name, this.createLinkTheme(applies, style));
    this.linkCssFileToDocument(style);
  }

  protected linkCssFileToDocument(style: HTMLStyleElement) {
    this.renderer.appendChild(this.doc.head, style);
  }

  protected isThemeLink(name: string): boolean {
    return this.linkedTheme.has(name);
  }

  protected setExistTheme(elRef: ElementRef, hash: string, themeName: string) {
    this.setAttribute(elRef, hash, '');
    this.upConsumers(themeName);
    if (!this.isServer) {
      return;
    }
    this.ssrHydrator.saveToStateTheme(this.linkedTheme);
  }

  protected createLinkTheme(
    appliesTheme: AppliesTheme,
    style: HTMLStyleElement
  ) {
    const consumers = this.linkedTheme.get(appliesTheme.item.name)?.consumers;
    return {
      name: appliesTheme.item.name,
      consumers: consumers || 0,
      styleData: {
        style: style,
        linkName: this.getThemeLinkName(appliesTheme, appliesTheme.item.name),
      },
      meta: appliesTheme.meta,
    };
  }

  protected upConsumers(name: string): void {
    const theme = this.linkedTheme.get(name);
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
    this.renderer.setAttribute(el.nativeElement, name, value);
  }

  protected createStyleElement(css: string, hash: string): HTMLStyleElement {
    const style: HTMLStyleElement = this.doc.createElement(
      'STYLE'
    ) as HTMLStyleElement;
    style.innerHTML = css;
    style.id = hash;
    return style;
  }

  protected removeByNameConsumers(name: string): void {
    const linkedTheme = this.linkedTheme.get(name);
    if (!linkedTheme) {
      return;
    }
    linkedTheme.consumers -= 1;
    const count = linkedTheme.consumers;

    if (count === 0) {
      linkedTheme.styleData.style.remove();
      removeCssHash(linkedTheme.styleData.linkName);
      this.linkedTheme.delete(name);
    }
  }

  protected getThemeLinkName(theme: AppliesTheme, name: string): string {
    return theme.theme;
  }

  public ngOnDestroy(): void {}
}
