import { inject, Injectable, makeStateKey, TransferState } from '@angular/core';
import { LinkedThemeInterface } from '../models/theme-manager.interface';
import { AppliesThemeMeta } from '../models/theme-data.interface';
import { DOCUMENT } from '@angular/common';

interface HydrationThemeInterface {
  theme: string;
  consumers: number;
  meta: AppliesThemeMeta;
}

const state = makeStateKey<HydrationThemeInterface[]>('themes');

@Injectable({ providedIn: 'root' })
export class ThemeSsrHydrator {
  protected transferState = inject(TransferState);
  protected doc: Document = inject(DOCUMENT);

  public saveToStateTheme(linkedThemes: Map<string, LinkedThemeInterface>) {
    const themes: HydrationThemeInterface[] = [];
    linkedThemes.forEach((theme) =>
      themes.push({
        consumers: theme.consumers,
        theme: theme.name,
        meta: theme.meta,
      })
    );
    this.transferState.set(state, themes);
    console.log('savedstate', this.transferState.get(state, []));
  }

  public hydrateThemes(): Map<string, LinkedThemeInterface> | void {
    const hydratedTheme: Map<string, LinkedThemeInterface> = new Map<
      string,
      LinkedThemeInterface
    >();
    const themes = this.transferState.get(state, []);
    if (!themes.length) {
      return;
    }

    themes.forEach((theme) => {
      const style: HTMLStyleElement | null = this.doc.getElementById(
        theme.theme
      ) as HTMLStyleElement;
      if (!style) {
        return;
      }
      hydratedTheme.set(theme.theme, {
        name: theme.theme,
        consumers: theme.consumers,
        styleData: {
          style,
          linkName: theme.theme,
        },
        meta: theme.meta,
      });
    });
    return hydratedTheme;
  }
}
