import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VInputComponent, VInputCompositionComponent } from '@v/f-ui';
import { VLabelDirective } from '../../../../../../../v/f-ui/src/lib/ui-elements/v-babel/v-label.directive';




@Component({
  selector: 'v-libs-forms-directive',
  standalone: true,
  imports: [CommonModule, VInputComponent, VInputCompositionComponent, VLabelDirective],
  templateUrl: './forms-directive.component.html',
  styleUrl: './forms-directive.component.css'
})
export class FormsDirectiveComponent implements OnInit {



  ngOnInit() {

  }

}
