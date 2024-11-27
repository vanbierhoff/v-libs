import { Component, effect, HostBinding, OnInit, signal } from '@angular/core';
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

  constructor() {
    effect(() => {
      console.log('signal', this.colorSignal());
      console.log('signal2', this.colorSignal2());
    });
  }


  @HostBinding('style.color')
  color = 'red';

  @HostBinding('style.color')
  colorRed = 'green';

  // @HostBinding('style.--vars-color')
  // colorVar = 'red';

  @HostBinding('class.valid')
  styVart = true;



  colorSignal = signal('');
  colorSignal2 = signal('2');


  ngOnInit() {
    const result = deepFirstSearchAlgorithm(MOCK_OBJECT_FOR_DEEP, {
      asResult: 'id2'
    });


    this.colorSignal.set('red');
    this.colorSignal.set('red2');
    this.colorSignal2.set('blue');


    const result2 = deepFirstSearchAlgorithm(MOCK_ARRAY_FOR_DEEP, {
      asResult: 10
    });
    if (detectChanges(oldObject, newObject)) {
      console.log('Changes detected!');
    } else {
      console.log('No changes detected.');
    }
  }


}
