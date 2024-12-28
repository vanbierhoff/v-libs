import {
  Component,
  ContentChild, effect, ElementRef,
  forwardRef, Inject, input, Input, InputSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeManagerService } from '@v/themes';
import { ComponentToken, HostComponent } from '../../as-token/component.token';
import { V_COMPOSE_INPUT_THEME } from '../../const';




@Component({
  selector: 'div[vInputCompose], section[vInputCompose], span[vInputCompose]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-input-composition.component.html',
  styleUrl: './v-input-composition.component.scss',
  providers: [{
    provide: HostComponent, useExisting: forwardRef(() => VInputCompositionComponent)
  }]
})
export class VInputCompositionComponent extends HostComponent {


  constructor(@Inject(ElementRef) protected elRef: ElementRef,
              protected themeManager: ThemeManagerService
  ) {
    super();
    this.setEffects();

    effect(() => {
    });

  }

  @ContentChild(forwardRef(() => ComponentToken), { read: ComponentToken })
  public readonly childComponent: ComponentToken = {} as ComponentToken;

  @Input() label: string = '';

  protected hasApplyTheme: boolean = false;
  protected prevTheme: string = '';


  appearance: InputSignal<string> = input<string>(V_COMPOSE_INPUT_THEME);


  setEffects() {
    effect(async () => {
      if (this.hasApplyTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.appearance(), this.elRef);
      this.prevTheme = this.appearance();
      this.hasApplyTheme = true;
    });
  }

  override registerControlHook(): void {
    this.childComponent?.control?.ngControl?.statusChanges?.subscribe(data => console.log(data));
  }
}
