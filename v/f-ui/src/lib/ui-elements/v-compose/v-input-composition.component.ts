import {
  Component,
  ContentChild,
  DestroyRef,
  effect,
  ElementRef,
  forwardRef,
  inject,
  Inject,
  input,
  InputSignal,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeManagerService } from '@v/themes';
import {
  ComponentToken,
  HOST_COMPONENT_STRATEGY,
  HostComponent,
} from '../../as-token/component.token';
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
export class VInputCompositionComponent implements DefaultHostInterface {
  constructor(
    @Inject(ElementRef) protected elRef: ElementRef,
    protected themeManager: ThemeManagerService
  ) {
    this.changeThemeEffect();
  }

  public destroyRef: DestroyRef = inject(DestroyRef);

  @ContentChild(forwardRef(() => ComponentToken), { read: ComponentToken })
  public readonly childComponent: ComponentToken = {} as ComponentToken;

  public readonly label: InputSignal<string> = input('');
  public readonly errorTpl: InputSignal<TemplateRef<unknown>> = input(
    undefined as unknown as TemplateRef<unknown>
  );

  protected hasApplyTheme: boolean = false;
  protected prevTheme: string = '';

  public hostStrategy: DefaultHostInterface = inject(HOST_COMPONENT_STRATEGY);

  get control() {
    return this.hostStrategy.control;
  }

  appearance: InputSignal<string> = input<string>(V_COMPOSE_INPUT_THEME);

  changeThemeEffect() {
    effect(async () => {
      if (this.hasApplyTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.appearance(), this.elRef);
      this.prevTheme = this.appearance();
      this.hasApplyTheme = true;
    });
  }

  public registerControlHook(): void {
    this.hostStrategy.registerControlHook();
  }

  public registerControl(control: VControlInterface): void {
    this.hostStrategy.destroyRef = this.destroyRef;
    this.hostStrategy.registerControl(control);
  }
}
