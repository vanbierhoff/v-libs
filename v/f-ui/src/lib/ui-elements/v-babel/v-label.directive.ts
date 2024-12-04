import { Directive, inject, Input, OnInit } from '@angular/core';
import { HostComponent } from '../../const/component.token';


@Directive({
  selector: '[vLabel]',
  standalone: true,
  host: {
    '[attr.focused]': 'hostComponent?.control?.focusable()'
  }
})
export class VLabelDirective {
  @Input('vLabel') public label: string = '';

  protected hostComponent = inject(HostComponent, { optional: true });


}
