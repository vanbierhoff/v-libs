import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  VButtonComponent,
  VInputComponent,
  VInputCompositionComponent,
  VLabelDirective,
  VTextareaComponent,
} from '@v/f-ui';

@Component({
  imports: [
    RouterModule,
    VButtonComponent,
    VInputComponent,
    VInputCompositionComponent,
    VLabelDirective,
    VTextareaComponent,
  ],
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
})
export class ThemeComponent {
  constructor() {}
}
