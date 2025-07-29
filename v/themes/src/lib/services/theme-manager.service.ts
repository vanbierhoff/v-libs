import {
  ElementRef,
  inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { handleCssFile } from './theme-handler';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { CssResourceInterface } from '../models/css-resource.interface';
import { ThemeDataService } from './theme-data.service';
import { AppliesTheme } from '../models/theme-data.interface';
import { LinkedThemeInterface } from '../models/theme-manager.interface';
import { ThemeSsrHydrator } from './theme-ssr.hydrator';
import { StringElementStrategy } from './strategies/style-string.strategy';
import { StyleElementStrategy } from './strategies/style-element.strategy';

@Injectable({ providedIn: 'root' })
export class ThemeManagerService {
  protected rendererFactory: RendererFactory2 = inject(RendererFactory2);
  protected renderer: Renderer2 = this.rendererFactory.createRenderer(
    null,
    null
  );
  protected platformId = inject(PLATFORM_ID);
  protected ssrHydrator: ThemeSsrHydrator = inject(ThemeSsrHydrator);
  protected isServer: boolean = isPlatformServer(this.platformId);
  protected stringStrategy: StringElementStrategy = new StringElementStrategy(
    this.renderer
  );
  protected styleElStrategy: StyleElementStrategy = new StyleElementStrategy(
    this.renderer
  );

  constructor() {
    const linkedThemes = this.ssrHydrator.hydrateThemes();
    if (linkedThemes) {
      this.linkedTheme = linkedThemes;
    }
  }

  protected themeData: ThemeDataService = inject(ThemeDataService);
  protected doc: Document = inject(DOCUMENT);
  protected linkedTheme: Map<string, LinkedThemeInterface> = new Map<
    string,
    LinkedThemeInterface
  >();

  // добваить метод проверки загрузки темы если загружена - накидывать сихнронно
  public async apply(
    name: string | string[],
    elRef: ElementRef
  ): Promise<void> {
    if (typeof name === 'string') {
      await this.applyTheme(name, elRef);
      return;
    }
    for await (const theme of name) {
      await this.applyTheme(theme, elRef);
    }
  }

  public unApply(name: string, elRef: ElementRef): void {
    this.removeAttribute(elRef, name);
    if (this.isServer || this.linkedTheme.get(name)?.meta?.isPermanent) {
      return;
    }
    this.removeByNameConsumers(name);
  }

  public async linkThemeAsCssFile(name: string) {
    const applies = this.themeData.getApplyTheme(name);
    if (!applies) {
      return;
    }
    if (this.isThemeLinked(name)) {
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

  /**
   *
   * @param name - theme/style name
   * @param elRef - ElRef target el
   * Apply style or css file by name
   */
  protected async applyTheme(name: string, elRef: ElementRef): Promise<void> {
    const theme: AppliesTheme | void = this.themeData.getApplyTheme(name);
    if (!theme) {
      return;
    }
    const hash: string = name;
    if (this.isThemeLinked(name)) {
      this.applyOnElementExistTheme(elRef, hash, name);
      return;
    }
    this.linkedTheme.set(name, { consumers: 0 } as LinkedThemeInterface);
    const cssResource: CssResourceInterface =
      await this.themeData.loadCssResource(theme);

    const linkStyleParam = [
      name,
      cssResource,
      theme,
      this.renderer,
      this.linkedTheme,
      elRef,
      hash,
    ];

    // TODO сейвить стили как строку в linked и аплаить без асинхронности
    // Как выше на IsThemeLink
    if (cssResource.type === 'style') {
      this.stringStrategy.linkStyle(
        name,
        cssResource,
        theme,
        this.renderer,
        this.linkedTheme,
        elRef,
        hash
      );
    } else {
      this.styleElStrategy.linkStyle(
        name,
        cssResource,
        theme,
        this.renderer,
        this.linkedTheme,
        elRef,
        hash
      );
    }

    this.upConsumers(name);
    if (!this.isServer) {
      return;
    }
    this.ssrHydrator.saveToStateTheme(this.linkedTheme);
  }

  protected linkCssFileToDocument(style: HTMLStyleElement) {
    this.renderer.appendChild(this.doc.head, style);
  }

  protected isThemeLinked(name: string): boolean {
    return this.linkedTheme.has(name);
  }

  protected applyOnElementExistTheme(
    elRef: ElementRef,
    hash: string,
    themeName: string
  ) {
    if (elRef.nativeElement.hasAttribute(hash)) {
      return;
    }

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

  protected removeAttribute(el: ElementRef, name: string): void {
    this.renderer.removeAttribute(el.nativeElement, name);
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
    const linkedTheme: object | undefined = this.linkedTheme.get(name);
    if (!linkedTheme) {
      return;
    }

    if (Object.prototype.hasOwnProperty.call(linkedTheme, 'styleAsString')) {
      this.stringStrategy.removeByNameConsumers(name, this.linkedTheme);
      return;
    }
    this.styleElStrategy.removeByNameConsumers(name, this.linkedTheme);
  }

  protected getThemeLinkName(theme: AppliesTheme, name: string): string {
    return theme.theme;
  }
}
