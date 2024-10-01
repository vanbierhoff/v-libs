import {
  ContentChildren,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Input,
  QueryList
} from '@angular/core';
import { ComponentToken } from '../const/component.token';
import { VFormInstance, createFormMonad } from '@v/f-core';



@Directive({
  selector: 'form[vForm]',
  standalone: true
})
export class VFormDirective {

  constructor() {
    this.elRef = inject(ElementRef);
  }


  @ContentChildren(forwardRef(() => ComponentToken), {read: ComponentToken})
  protected childComponent: QueryList<ComponentToken> = new QueryList<ComponentToken>();

  elRef: ElementRef;

  @Input({
    required: true,
    transform: (value: unknown) => {
      if (value instanceof VFormInstance) {
        return value;
      }
      const form = createFormMonad(value).get();
      if (form instanceof VFormInstance) {
        return form;
      }
      throw new Error(`value  ${value} is not a form or impossible get form from this instance`);
    }
  }) public vForm!: VFormInstance<unknown>;


  @HostListener('submit', ['$event'])
  async onSubmit(event: Event) {
    event?.preventDefault();
    if (this.vForm instanceof VFormInstance) {
      const result = await this.vForm.validate();
    }
  }

}
