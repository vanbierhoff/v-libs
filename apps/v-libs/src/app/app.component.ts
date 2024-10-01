import { Component, HostBinding, OnInit } from '@angular/core';
import { deepFirstSearchAlgorithm } from '@v-libs/v/tree-creator';
import { MOCK_ARRAY_FOR_DEEP, MOCK_OBJECT_FOR_DEEP } from './modules/tree-utils/models/mock-obj';
import { detectChanges, newObject, oldObject } from './change-detector/change-detector';


let changed = 0;

@Component({
  selector: 'v-libs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'v-libs';
  users = [1, 2, 3];


  @HostBinding('style.color')
  color = 'red';

  @HostBinding('style.color')
  colorRed = 'green';

  // @HostBinding('style.--vars-color')
  // colorVar = 'red';

  @HostBinding('class.valid')
  styVart = true;


  ngOnInit() {
    const result = deepFirstSearchAlgorithm(MOCK_OBJECT_FOR_DEEP, {
      asResult: 'id2'
    });


    const result2 = deepFirstSearchAlgorithm(MOCK_ARRAY_FOR_DEEP, {
      asResult: 10
    });
    if (detectChanges(oldObject, newObject)) {
      console.log("Changes detected!");
    } else {
      console.log("No changes detected.");
    }
  }


}
