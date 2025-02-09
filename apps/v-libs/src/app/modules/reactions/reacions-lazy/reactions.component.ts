import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  provideStackRunner,
  reaction,
  reactionComputed,
  reactor,
} from '@v/reactions';

@Component({
  selector: 'v-rx-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reactions.component.html',
  styleUrl: './reactions.component.css',
})
export class ReactionsLazyComponent implements OnInit {
  constructor() {
    provideStackRunner('microtask');
    effect(() => {
      console.log('effect', this.color());
    });
  }

  color = signal('blue');

  ngOnInit() {
    const baseReact = reactor(100);
    const baseReact2 = reactor(200);

    let counter: number = 0;

    // first = 300
    const baseComputed = reactionComputed(() => {
      return baseReact2() + baseReact();
    });

    // const baseComputed2 = reactionComputed(() => {
    //   // 300 + 100 = 400 // two handle = 50 + 300
    //   return baseComputed() + baseReact();
    // });
    //
    // const baseComputed3 = reactionComputed(() => {
    //   counter = counter + 1;
    //   return baseComputed2();
    // });

    reaction(() => {
      console.log('BASE LAZY baseComputed3', baseComputed());
    });
    // reaction(() => {
    //   console.log('BASE LAZY baseReact', baseReact());
    // });
    // baseReact.set(50);

    setTimeout(() => {
      console.log('COUNTER ', counter);
      // baseComputed.set(200);
      baseReact.set(150);
    }, 3000);
  }
}
