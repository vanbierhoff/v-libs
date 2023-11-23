import { Component, OnInit } from '@angular/core';
import { deepFirstSearchAlgorithm } from '@v-libs/v/tree-creator';
import { MOCK_ARRAY_FOR_DEEP, MOCK_OBJECT_FOR_DEEP } from './modules/tree-utils/models/mock-obj';


@Component({
  selector: 'v-libs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'v-libs';
  users = [1,2, 3]


  ngOnInit() {
    const result = deepFirstSearchAlgorithm(MOCK_OBJECT_FOR_DEEP, {
      asResult: 'id2'
    });

    console.log(result);

    const result2 = deepFirstSearchAlgorithm(MOCK_ARRAY_FOR_DEEP, {
      asResult: 10
    });
    console.log(result2);
  }

}
