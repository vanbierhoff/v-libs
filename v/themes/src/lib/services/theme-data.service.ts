import { Inject, Injectable } from '@angular/core';
import { THEME_LINK } from '../const/theme-tokens';
import {
  ThemeListInterface,
  ThemeModuleInterface,
} from '../models/theme-module.interface';
import { AppliesTheme } from '../models/theme-data.interface';
import {
  CssFileData,
  CssResourceInterface,
  StyleData,
  ThemeInterface,
} from '../models';

@Injectable({ providedIn: 'root' })
export class ThemeDataService {
  constructor(@Inject(THEME_LINK) private theme: ThemeListInterface) {}

  /**
   *
   * @param name - theme/style name
   * Apply style or css file by name
   */
  public getApplyTheme(name: string): AppliesTheme | void {
    const themeItem = this.getTheme(name);
    if (!themeItem) {
      return;
    }

    return {
      theme: themeItem.name,
      item: themeItem,
      meta: {
        isPermanent: themeItem?.isPermanent ?? false,
      },
    };
  }

  public async loadThemes(names: Array<string>): Promise<void> {
    for await (const name of names) {
      const appliesList = this.getApplyTheme(name);
      if (!appliesList) {
        continue;
      }
      await this.loadStyles(appliesList);
    }
  }

  public async loadCssResource(
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

  // Унести в themeData и назвать иначе
  // сделать метод для определения типа cssFile или style для apply
  protected defineTypeLink(theme: AppliesTheme): 'style' | 'css' {
    if (theme?.item.style) {
      return 'style';
    }
    if (theme?.item.cssFile) {
      return 'css';
    }
    throw new Error('Styles or style block not defined');
  }

  protected getTheme(name: string): ThemeInterface | undefined {
    let themeItem: ThemeInterface | undefined = this.theme.items.find(
      (item: ThemeInterface) => item.name === name
    );
    if (themeItem) {
      return themeItem;
    }
    this.theme.themes?.find((theme: ThemeModuleInterface) => {
      theme.items.find((item: ThemeInterface) => {
        if (item.name === name) {
          themeItem = item;
          return true;
        }
        return false;
      });
    });
    return themeItem;
  }

  protected async loadStyles(theme: AppliesTheme): Promise<void> {
    if (theme?.item.style) {
      await theme.item.style();
      return;
    }
    if (theme?.item.cssFile) {
      await theme.item.cssFile();
      return;
    }
    console.warn('Styles or style block not defined');
  }
}
