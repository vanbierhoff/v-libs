import { Component, OnInit } from '@angular/core';
import { deepFirstSearchAlgorithm } from '@v-libs/v/tree-creator';
import { MOCK_OBJECT_FOR_DEEP } from './modules/tree-utils/models/mock-obj';

@Component({
  selector: 'v-libs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  implements  OnInit{
  title = 'v-libs';



  ngOnInit() {
    const result = deepFirstSearchAlgorithm(MOCK_OBJECT_FOR_DEEP, {
      byField: 'twoObj'
    });

    console.log(result);
  }

}
