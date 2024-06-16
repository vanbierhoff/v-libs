import {
  AfterViewInit,
  Component,
  ContentChild,
  forwardRef, Input,
  OnInit, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentToken } from '../../const/component.token';
import { FORM_FIELD_EVENTS } from '@v/f-core';
import { VLoaderDirective } from '../directives/v-loader/v-loader.directive';




@Component({
  selector: 'button[vButton], a[vButton]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-button.component.html',
  styleUrl: './v-input-composition.component.scss'
})
export class VButtonComponent implements OnInit, AfterViewInit {

  @Input() iconStyle: string = '';

  @Input() iconPosition: 'left' | 'right' = 'left';

  @ViewChild(VLoaderDirective, {read: VLoaderDirective})
  public loader: VLoaderDirective;

  // themeName = input()

  @ContentChild(forwardRef(() => ComponentToken), {read: ComponentToken})
  protected childComponent: ComponentToken = {} as ComponentToken;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.childComponent.formField.listenEvent(FORM_FIELD_EVENTS.changeValue, () => {
      this.childComponent.formField.validate();
    });

  }
}
