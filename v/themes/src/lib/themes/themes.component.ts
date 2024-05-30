import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { THEME_LINK } from '../const/theme-tokens';



@Component({
  selector: 'v-libs-themes',
  standalone: true,
  imports: [CommonModule],
  providers: [
  ],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.css'
})
export class ThemesComponent {
}
