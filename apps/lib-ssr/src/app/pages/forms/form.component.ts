import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  VButtonComponent,
  VInputComponent,
  VInputCompositionComponent,
  VLabelDirective,
} from '@v/f-ui';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [
    RouterModule,
    VButtonComponent,
    VInputComponent,
    VInputCompositionComponent,
    VLabelDirective,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  selector: 'app-theme',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  private fb: FormBuilder = inject(FormBuilder);

  public readonly form = this.fb.group({
    name: ['base', Validators.required],
  });

  public readonly name: Observable<unknown> =
    this.form.controls.name.valueChanges;

  public startValue = this.form.controls.name.value;
}
