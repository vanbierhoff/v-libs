import {
  ContentChildren,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Input,
  OnInit, QueryList
} from '@angular/core';
import { ComponentToken } from '../const/component.token';
import { VFormInstance } from 'v/f-core/src/lib/form-instances/form-instance/form-instance';
import { createFormMonad } from '../../../../f-core/src/lib/form-meta-store/add-to-store';


@Directive({
  selector: 'form[vForm]',
  standalone: true
})
export class VFormDirective implements OnInit {

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

  ngOnInit() {
    setTimeout(() => {
      console.log(this.childComponent);
    }, 5000);
  }


  @HostListener('submit', ['$event'])
  async onSubmit(event: Event) {
    event?.preventDefault();
    console.log('event submit', event);
    if (this.vForm instanceof VFormInstance) {
      const result = await this.vForm.validate();
      console.log('resutl valid', result);
    }
  }

}
