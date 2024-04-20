import { Directive, TemplateRef } from '@angular/core';


@Directive({
  selector: '[vLabels]',
  standalone: true
})
export class VLabelDirective {
  constructor(public readonly template: TemplateRef<any>) {
  }

}
