import {
  Component,
  ElementRef,
  HostBinding,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { deepFirstSearchAlgorithm } from '@v-libs/v/tree-creator';
import {
  MOCK_ARRAY_FOR_DEEP,
  MOCK_OBJECT_FOR_DEEP,
} from './modules/tree-utils/models/mock-obj';
import {
  detectChanges,
  newObject,
  oldObject,
} from './change-detector/change-detector';
import { ThemeManagerService } from '@v/themes';
import { V_VARS_THEME } from '@v/f-ui';

@Component({
  selector: 'v-libs-root',
  standalone: false,
  templateUrl: './app.component.html',
  providers: [],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'v-libs';
  users = [1, 2, 3];

  theme = inject(ThemeManagerService);
  elRef = inject(ElementRef);

  // @HostBinding('style.--vars-color')
  // colorVar = 'red';

  @HostBinding('class.valid')
  styVart = true;

  colorSignal = signal('');
  colorSignal2 = signal('2');

  ngOnInit() {
    console.log(this.elRef);
    const result = deepFirstSearchAlgorithm(MOCK_OBJECT_FOR_DEEP, {
      asResult: 'id2',
    });

    this.theme.apply(V_VARS_THEME, this.elRef);

    this.colorSignal.set('red');
    this.colorSignal.set('red2');
    this.colorSignal2.set('blue');

    const result2 = deepFirstSearchAlgorithm(MOCK_ARRAY_FOR_DEEP, {
      asResult: 10,
    });
    if (detectChanges(oldObject, newObject)) {
      console.log('Changes detected!');
    } else {
      console.log('No changes detected.');
    }

    //   this.inCtx()
  }

  inCtx() {
    console.log(inject(ThemeManagerService));
  }
}
