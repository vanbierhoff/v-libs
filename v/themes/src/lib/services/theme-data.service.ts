import { Inject, Injectable, Renderer2 } from '@angular/core';
import { THEME_LINK } from '../const/theme-tokens';
import { ThemeListInterface, ThemeModuleInterface } from '../models/theme-module.interface';
import { find } from 'lodash';
import { AppliesTheme } from '../models/theme-data.service';



@Injectable({providedIn: 'root'})
export class ThemeDataService {

  constructor(
    @Inject(THEME_LINK) private theme: ThemeListInterface
  ) {
  }


  /**
   *
   * @param name - theme/style name
   * Apply style or css file by name
   */
  public getApplies(name: string): Array<AppliesTheme> | void {
    const appliesList: Array<AppliesTheme> = [];
    const theme = {
      theme: this.theme.theme,
      item: this.theme.items.find((item) => item.name === name)
    };
    if (!theme || theme.item === undefined) {
      console.warn(`Theme with name${name} not found`);
      return;
    }
    appliesList.push(theme as AppliesTheme);

    if (!this.theme?.themes) {
      return appliesList;
    }

    this.theme.themes.forEach((subTheme: ThemeModuleInterface) => {
      const theme = find(subTheme.items, item => item.name === name);
      if (!theme) {
        return;
      }
      appliesList.push({
        theme: theme.name,
        item: theme
      });
    });

    return appliesList;
  }
}




