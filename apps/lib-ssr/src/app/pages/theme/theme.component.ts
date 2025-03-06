import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VButtonComponent, VInputComponent } from '@v/f-ui';

@Component({
  imports: [RouterModule, VButtonComponent, VInputComponent],
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
})
export class ThemeComponent {
  constructor() {}
}
