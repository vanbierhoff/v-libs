import {
  V_BUTTON_THEME,
  V_COMPOSE_INPUT_THEME,
  V_INPUT_THEME,
  V_TEXTAREA_THEME,
  V_VARS_THEME,
} from '@v/f-ui';
import { V_LABEL_THEME } from 'v/f-ui/src/lib/const/theme/v-label.theme';
import {
  ThemeListInterface,
  ThemeModuleInterface,
} from 'v/themes/src/lib/models/theme-module.interface';

// TODO запретить две темы с одинаковым именем в след версиях
export const F_UI_THEME: ThemeModuleInterface = {
  theme: 'base-f-ui-theme',
  items: [
    {
      name: V_VARS_THEME,
      cssFile: () =>
        import(
          '!!raw-loader!v/f-ui/src/lib/styles/theme/default/default-vars.theme.css'
        ),
    },
    {
      name: V_INPUT_THEME,
      cssFile: () =>
        import('!!raw-loader!v/f-ui/src/lib/styles/v-input.theme.css'),
      isPermanent: true,
    },
    {
      name: V_TEXTAREA_THEME,
      cssFile: () =>
        import('!!raw-loader!v/f-ui/src/lib/styles/v-textarea.theme.css'),
    },
    {
      name: V_BUTTON_THEME,
      cssFile: () =>
        import('!!raw-loader!v/f-ui/src/lib/styles/buttons/v-button.theme.css'),
    },
    {
      name: V_COMPOSE_INPUT_THEME,
      cssFile: () =>
        import('!!raw-loader!v/f-ui/src/lib/styles/other/v-compose.theme.css'),
    },
    {
      name: V_LABEL_THEME,
      cssFile: () =>
        import('!!raw-loader!v/f-ui/src/lib/styles/v-label.theme.css'),
    },
  ],
};

export const BaseTheme: ThemeModuleInterface = {
  theme: 'base',
  items: [
    {
      name: 'buttonCss',
      cssFile: () => import('!!raw-loader!./styles/button.theme.css'),
    },
    {
      name: 'buttonBlock',
      style: () => import('!!raw-loader!./styles/button-style.theme.css'),
    },
  ],
};

export const BASE_THEME_LINK: ThemeListInterface = {
  theme: 'base',
  items: BaseTheme.items,
  themes: [F_UI_THEME],
};
