import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { reaction, reactor, provideStackRunner } from '@v-reactions/source';



@Component({
  selector: 'v-rx-forms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reactions.component.html',
  styleUrl: './reactions.component.css'
})
export class ReactionsComponent implements OnInit {
  constructor() {
    provideStackRunner('microtask');
    effect(() => {
      console.log('effect', this.color());
    });
  }

  color = signal('blue');

  ngOnInit() {

    const react1 = reactor(100);
    const react2 = reactor(200);

    let runCounter = 0;

    reaction(() => {
      runCounter++;
      console.log('react two 1', react1());
      console.log('react two 2', react2());
      return;
    });


    reaction(() => {
      runCounter++;
      console.log('react 1', react1());
      console.log('react 2', react2());
      return;
    });

    reaction(() => {
      runCounter++;
      console.log('react three 1', react1());
      console.log('react three 2', react2());
      return;
    });




    react1.set(100);
    react1.set(105);
    react2.set(199);
    react2.set(305);
    this.color.set('red');
    console.log(' RUN COUNTER:', runCounter);
    //  console.log('RESULT react2:', react2());

    setTimeout(() => {
      // react2.destroy();
      react1.set(300);
      console.log(' RUN COUNTER AFTER TIMEOUT:', runCounter);
    }, 3000);
  }



}
