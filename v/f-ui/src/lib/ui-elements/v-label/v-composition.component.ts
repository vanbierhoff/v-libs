import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'div[vCompose], section[vCompose], span[vCompose]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-composition.component.html',

  styleUrl: './v-composition.component.scss'
})
export class VCompositionComponent {

}
