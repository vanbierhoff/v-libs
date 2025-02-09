import { provideStackRunner } from './models/reaction-parameters';
import { reaction, reactionComputed, reactor } from './reactions/reactions';

describe('vReactions', () => {
  provideStackRunner('sync');
  it('should work COMPUTED REACTIONS', () => {
    const baseReact = reactor(100);
    const baseReact2 = reactor(200);

    const baseComputed = reactionComputed(() => {
      return baseReact2() + baseReact();
    });

    reaction(() => {
      console.log('BASE COMPUTED', baseComputed());
    });

    expect(baseComputed()).toBe(300);
  });

  it('should work LAZY MODEL, to be counter 1', () => {
    const baseReact = reactor(100);
    const baseReact2 = reactor(200);

    let counter: number = 0;

    const baseComputed = reactionComputed(() => {
      return baseReact2() + baseReact();
    });

    const baseComputed2 = reactionComputed(() => {
      return baseComputed() + baseReact();
    });

    const baseComputed3 = reactionComputed(() => {
      counter = counter + 1;
      return baseComputed2();
    });

    reaction(() => {
      console.log('BASE LAZY', baseComputed3());
    });
    baseReact.set(50);
    baseReact.set(210);

    console.log('COUNTER ', counter);
    console.log('SUM ', baseComputed2());

    expect(counter).toBe(1);
  });
});
