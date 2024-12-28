import {
  computed,
  Directive,
  effect,
  inject,
  Injectable,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Injectable()
@Directive({
  selector: '[luClickScrollTop]',
  standalone: true,
})
export class ScrollTopDirective implements OnInit {
  private service: FormGroupDirective = inject<FormGroupDirective>(FormGroupDirective);

  disable: InputSignal<boolean> = input(false);
  isSubmit: WritableSignal<boolean> = signal(false);

  disableForm = computed(() => !this.disable() || this.isSubmit());

  constructor() {
    effect(() => {
      if (this.disableForm()) {
        this.service.form.disable();
      } else {
        this.service.form.disable();
      }
    });
  }

  ngOnInit(): void {
    this.service.ngSubmit.subscribe((data) => this.isSubmit.set(true));
  }
}
