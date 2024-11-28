import { BaseScheduler, BrowserSchedulerStrategyType, Stack } from '@v/stack';


export let stackItem: Stack;
export const createRunner = (type: BrowserSchedulerStrategyType) => new BaseScheduler(type);

export const provideStackRunner = (type: BrowserSchedulerStrategyType) => {
  const runner = createRunner(type);
  stackItem = new Stack(runner, true);
}
