import {
  AfterViewInit,
  Component,
  ContentChild, ElementRef,
  forwardRef,
  OnInit, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentToken } from '../../const/component.token';
import { FORM_FIELD_EVENTS } from '../../../../../f-core/src/lib/consts/events/form-field.events';
import { GetErrorPipe } from './pipes/get-error.pipe';
import { VLabelDirective } from '../v-babel/v-label.directive';


@Component({
  selector: 'div[vInputCompose], section[vInputCompose], span[vInputCompose]',
  standalone: true,
  imports: [CommonModule, GetErrorPipe],
  templateUrl: './v-input-composition.component.html',
  styleUrl: './v-input-composition.component.scss'
})
export class VInputCompositionComponent implements OnInit, AfterViewInit {

  @ContentChild(forwardRef(() => ComponentToken), {read: ComponentToken})
  protected childComponent: ComponentToken = {} as ComponentToken;


  @ContentChild(forwardRef(() => VLabelDirective))
  protected vLabel: VLabelDirective = {} as any;



  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.childComponent.formField.listenEvent(FORM_FIELD_EVENTS.changeValue, () => {
      this.childComponent.formField.validate();
    });
    console.log(this.vLabel);
  }
}
