import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  effect,
  EffectRef,
  ElementRef,
  forwardRef,
  inject,
  input,
  InputSignal,
  OnDestroy,
  Signal,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeManagerService } from '@v/themes';
import {
  HOST_COMPONENT_STRATEGY,
  HostComponent,
  TextFieldChildComponentToken,
} from '../../as-token/text-field-child-component-token';
import { V_COMPOSE_INPUT_THEME } from '../../const';
import { DefaultHostStrategy } from '../../hosts/host-strategies/default-host.strategy';
import { VControlInterface } from '../../custom-controls/models/v-control.interface';
import { DefaultHostInterface } from '../../as-token/default-host.interface';
import { FormsErrorPipe } from '../../utils/forms-error.pipe';

@Component({
  selector: 'div[vInputCompose], section[vInputCompose], span[vInputCompose]',
  standalone: true,
  imports: [CommonModule, FormsErrorPipe],
  templateUrl: './v-input-composition.component.html',
  styleUrl: './v-input-composition.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: HOST_COMPONENT_STRATEGY,
      useFactory: () => new DefaultHostStrategy(),
    },
    {
      provide: HostComponent,
      useExisting: forwardRef(() => VInputCompositionComponent),
    },
  ],
})
export class VInputCompositionComponent implements OnDestroy {
  constructor() {
    this.changeThemeEffect();
  }

  protected readonly elRef: ElementRef = inject(ElementRef);
  protected readonly themeManager: ThemeManagerService =
    inject(ThemeManagerService);

  public readonly destroyRef: DestroyRef = inject(DestroyRef);
  public readonly hostStrategy: DefaultHostInterface = inject(
    HOST_COMPONENT_STRATEGY
  );

  public readonly appearance: InputSignal<string[]> = input<string[]>([
    V_COMPOSE_INPUT_THEME,
  ]);

  public readonly child: Signal<TextFieldChildComponentToken | undefined> =
    contentChild(TextFieldChildComponentToken, {
      read: TextFieldChildComponentToken,
    });

  public viewError: Signal<boolean> = computed(() => {
    const isFocus: boolean | undefined = this.hostStrategy.control?.focusable();
    return !!(this.hostStrategy?.ngControl?.touched && !isFocus);
  });

  public readonly label: InputSignal<string> = input('');
  public readonly errorTpl: InputSignal<TemplateRef<unknown>> = input(
    undefined as unknown as TemplateRef<unknown>
  );

  public hasApplyTheme: boolean = false;

  private appliedTheme: string[] = [];

  private changeThemeEffect(): void {
    effect(async () => {
      if (!this.appearance().length) {
        return;
      }

      if (this.hasApplyTheme) {
        this.unApplyTheme();
        this.hasApplyTheme = false;
      }

      for await (const theme of this.appearance()) {
        await this.themeManager.apply(theme, this.elRef);
        this.appliedTheme.push(theme);
        this.hasApplyTheme = true;
      }
    });
  }

  private registerEffRef: EffectRef = effect(() => {
    const controller: VControlInterface | undefined | null =
      this.child()?.controller;
    if (controller) {
      this.registerControl(controller);
      this.registerEffRef.destroy();
    }
  });

  private registerControl(control: VControlInterface): void {
    this.hostStrategy.registerControl(control, this.destroyRef);
    this.registerEffRef.destroy();
  }

  private unApplyTheme(): void {
    this.appliedTheme.forEach((theme: string) =>
      this.themeManager.unApply(theme, this.elRef)
    );
  }

  ngOnDestroy(): void {
    this.unApplyTheme();
  }
}
