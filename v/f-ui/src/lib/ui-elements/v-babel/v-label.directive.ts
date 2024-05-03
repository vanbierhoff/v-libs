import { Directive, Input} from '@angular/core';


@Directive({
  selector: '[vLabel]',
  standalone: true
})
export class VLabelDirective {
  @Input('vLabel') public label: string = '';

}
