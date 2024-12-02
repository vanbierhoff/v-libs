import {
  AfterViewInit,
  Component,
  ContentChild,
  forwardRef, Input,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentToken } from '../../const/component.token';






@Component({
  selector: 'div[vInputCompose], section[vInputCompose], span[vInputCompose]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-input-composition.component.html',
  styleUrl: './v-input-composition.component.scss',
  providers: [{
    provide: ComponentToken, useExisting: forwardRef(() => VInputCompositionComponent)
  }]
})
export class VInputCompositionComponent implements OnInit, AfterViewInit {

  @ContentChild(forwardRef(() => ComponentToken), {read: ComponentToken})
  protected childComponent: ComponentToken = {} as ComponentToken;

  @Input() label: string = '';

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.childComponent?.control?.statusChanges?.subscribe(data => console.log(data));
    console.log(this.childComponent.control?.errors);
    // this.childComponent.formField.listenEvent(FORM_FIELD_EVENTS.changeValue, () => {
    //   this.childComponent.formField.validate();
    // });
  }
}
