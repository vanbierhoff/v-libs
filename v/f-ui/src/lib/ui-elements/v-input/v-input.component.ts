import {
  Component, computed,
  ElementRef,
  EventEmitter,
  HostBinding, HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { attrController } from '../../utils/attr-ontroller';
import { FormField } from '../../../../../f-core/src/lib/form-instances/form-field/form-field';


@Component({
  selector: 'v-input input[vInput]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-input.component.html',
  host: {
    '(input)': 'inputValue($event)',
    '[value]': 'valueComp()'
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
    this.readonlySignal.set(v);
  }

  @ViewChild('input', {read: ElementRef})
  input: ElementRef = {} as ElementRef;

  @Output()
  inputEv: EventEmitter<any> = new EventEmitter();

  set fField(v: FormField) {
    this.formField = v;
  }

  protected disabledSignal = signal(false);
  protected readonlySignal = signal(false);
  protected value = signal('');
  protected valueComp = computed(() => `${this.value()}  comp `);

  protected formField: FormField | null = null;

  inputValue(v: any) {
    console.log(v);
  }

  @HostListener('input', ['$event'])
  inputValue2(v: any) {
    console.log('2', v);
  }

  ngOnInit() {
    this.value.set('data')
  }

}
