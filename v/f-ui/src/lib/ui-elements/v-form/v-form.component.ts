import { Component, ContentChildren, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentToken } from '../../const/component.token';


@Component({
  selector: 'v-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-form.component.html',
  styleUrl: './v-form.component.scss'
})
export class VFormComponent {

  @ContentChildren(forwardRef(() => ComponentToken), {read: ComponentToken})
  protected childComponent: ComponentToken = {} as ComponentToken;


}
