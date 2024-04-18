import { Component, ElementRef, Inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { attrController } from '../../utils/attr-ontroller';
import { FormField } from '../../../../../f-core/src/lib/form-instances/form-field/form-field';


@Component({
  selector: 'v-input input[vInput]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-input.component.html',
  host: {
    // '[attr.disabled]': 'disabledSignal()'
  },
  styleUrl: './v-input.component.scss'
})
export class VInputComponent implements OnInit {

  constructor(@Inject(ElementRef) protected elRef: ElementRef) {
    attrController(elRef, {
      disabled: this.disabledSignal,
      readonly: this.readonlySignal
    });
  }


  @Input() set locked(v: boolean) {
    this.disabledSignal.set(v);
  }

  @Input() set readonly(v: boolean) {
    this.disabledSignal.set(v);
  }

  protected disabledSignal = signal(false);
  protected readonlySignal = signal(false);

  protected formField: FormField | null = null;

  ngOnInit() {
    this.elRef.nativeElement;
    setTimeout(() => {
      this.disabledSignal.set(true);
    }, 3500);
  }
}
