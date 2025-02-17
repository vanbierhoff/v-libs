import { Inject, Injectable } from '@angular/core';
import { THEME_LINK } from '../const/theme-tokens';
import {
  ThemeListInterface,
  ThemeModuleInterface,
} from '../models/theme-module.interface';
import { AppliesTheme } from '../models/theme-data.interface';

@Injectable({ providedIn: 'root' })
export class ThemeDataService {
  constructor(@Inject(THEME_LINK) private theme: ThemeListInterface) {}

  /**
   *
   * @param name - theme/style name
   * Apply style or css file by name
   */
  public getApplies(name: string): Array<AppliesTheme> | void {
    const appliesList: Array<AppliesTheme> = [];
    const theme = {
      theme: this.theme.theme,
      item: this.theme.items.find((item) => item.name === name),
    };
    if (theme.item !== undefined) {
      appliesList.push(theme as AppliesTheme);
    }

    if (!this.theme?.themes) {
      return appliesList;
    }

    this.theme.themes.forEach((subTheme: ThemeModuleInterface) => {
      const theme = subTheme.items.find((item) => item.name === name);
      if (!theme) {
        return;
      }
      appliesList.push({
        theme: theme.name,
        item: theme,
      });
    });

    return appliesList;
  }

  async loadThemes(names: Array<string>): Promise<void> {
    for await (const name of names) {
      const appliesList = this.getApplies(name);
      if (!appliesList) {
        continue;
      }
      for await (const theme of appliesList) {
        await this.loadStyles(theme);
      }
    }
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
