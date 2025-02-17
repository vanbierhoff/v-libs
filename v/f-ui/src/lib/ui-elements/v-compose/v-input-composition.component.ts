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
  Inject,
  input,
  InputSignal,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeManagerService } from '@v/themes';
import {
  ChildComponentToken,
  HOST_COMPONENT_STRATEGY,
  HostComponent,
} from '../../as-token/child-component-token';
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
  constructor(
    @Inject(ElementRef) protected elRef: ElementRef,
    protected themeManager: ThemeManagerService
  ) {
    this.changeThemeEffect();
  }

  public destroyRef: DestroyRef = inject(DestroyRef);
  public hostStrategy: DefaultHostInterface = inject(HOST_COMPONENT_STRATEGY);

  public readonly child = contentChild(ChildComponentToken, {
    read: ChildComponentToken,
  });

  public viewError = computed(() => {
    const isFocus = this.hostStrategy.control?.focusable();
    return this.hostStrategy.control?.ngControl?.touched && !isFocus;
  });

  public readonly label: InputSignal<string> = input('');
  public readonly errorTpl: InputSignal<TemplateRef<unknown>> = input(
    undefined as unknown as TemplateRef<unknown>
  );

  protected hasApplyTheme: boolean = false;
  protected prevTheme: string = '';

  appearance: InputSignal<string> = input<string>(V_COMPOSE_INPUT_THEME);

  private changeThemeEffect(): void {
    effect(async () => {
      if (this.hasApplyTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.appearance(), this.elRef);
      this.prevTheme = this.appearance();
      this.hasApplyTheme = true;
    });
  }

  private registerEffRef: EffectRef = effect(() => {
    const controller = this.child()?.controller;
    if (controller) {
      this.registerControl(controller);
    }
  });

  private registerControl(control: VControlInterface): void {
    this.hostStrategy.destroyRef = this.destroyRef;
    this.hostStrategy.registerControl(control);
    this.hostStrategy.registerControlHook();
    this.registerEffRef.destroy();
  }

  ngOnDestroy(): void {
    this.themeManager.unApply(this.appearance());
  }
}
