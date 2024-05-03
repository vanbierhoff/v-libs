import {
  AfterViewInit,
  Component,
  ContentChild,
  forwardRef, Input,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentToken } from '../../const/component.token';
import { GetErrorPipe } from './pipes/get-error.pipe';
// @ts-ignore
import { FORM_FIELD_EVENTS } from '@v/f-core';




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

  @Input() label: string = '';

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.childComponent.formField.listenEvent(FORM_FIELD_EVENTS.changeValue, () => {
      this.childComponent.formField.validate();
    });

  }
}
