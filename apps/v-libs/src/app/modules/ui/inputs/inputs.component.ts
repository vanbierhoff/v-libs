import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueTransformer } from '../../../../../../../v/f-ui/src/lib/shared';
import {
  VInputComponent,
  VInputCompositionComponent,
  VLabelDirective,
  VTextareaComponent,
} from '@v/f-ui';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'v-libs-inputs',
  standalone: true,
  imports: [
    CommonModule,
    VInputComponent,
    VInputCompositionComponent,
    VLabelDirective,
    ReactiveFormsModule,
    VInputCompositionComponent,
    VInputComponent,
    VLabelDirective,
    VTextareaComponent,
  ],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css',
})
export class InputsComponent implements OnInit {
  public transformer: ValueTransformer<any, string> = (v: any): string => {
    if (v?.startsWith('+')) {
      return v;
    }
    return `+${v}`;
  };

  locked = false;

  ngOnInit() {}
}
