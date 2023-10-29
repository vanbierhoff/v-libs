import { Component, OnInit } from '@angular/core';
import { deepFirstSearchAlgorithm } from '@v-libs/v/tree-creator';
import { MOCK_OBJECT_FOR_DEEP } from './models/mock-obj';


@Component({
  selector: 'tree-utils',
  templateUrl: './tree-utils.component.html',
  styleUrls: ['./tree-utils.component.scss'],
  standalone: true
})
export class TreeUtilsComponent implements OnInit {


  ngOnInit() {
    const result = deepFirstSearchAlgorithm(MOCK_OBJECT_FOR_DEEP, {
      byField: 'twoObj'
    });

    console.log(result);
  }

}
