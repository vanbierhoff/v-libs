import {
  ReactionComputedFnInterface,
  ReactionFnInterface,
} from '../models/reaction-fn.interface';
import {
  GlobalComputedReactorInterface,
  GlobalReactorInterface,
  ReactorStateInterface,
  XReactor,
} from './models/reactions.interface';
import { ReactorOptionsInterface } from './models/reactor-options.interface';
import {
  isWaitUpdate,
  plannedUpdateCreate,
  pushToWaitedUpdate,
} from './manager-task';
import { PHASE_REACTIONS } from './models/reactions.const';

let idFn = 0;

export interface ReactionModel<T> {
  value: T;
  state: ReactorStateInterface;
  context?: GlobalReactorInterface | GlobalComputedReactorInterface;
}

let globalReactorEffect: GlobalReactorInterface | null = {
  cbFn: () => {},
  deep: 0,
  type: 'default',
  phase: PHASE_REACTIONS.idle,
  cbId: 0,
  nextUpdateReactions: [],
  planned: false,
};

export const reactor = <T>(
  v: T,
  options?: ReactorOptionsInterface
): XReactor<T> => {
  let reaction: ReactionModel<T> = {
    value: v,
    state: {
      reactionsList: [],
    },
  };

  const reactorFn = () => {
    if (
      globalReactorEffect &&
      !reaction.state.reactionsList.some(
        (item) => item.cbId === globalReactorEffect!.cbId
      )
    ) {
      reaction.state.reactionsList.push(globalReactorEffect);
    }

    return reaction.value;
  };
  reactorFn.set = (v: T) => {
    reaction.value = v;

    reaction.state.reactionsList.forEach((context: GlobalReactorInterface) => {
      // restrict set value during run effect / computed
      if (context.isRunning) {
        return;
      }

      context.deep = context.deep + 1;
      // check recursive call limit
      if (
        !isWaitUpdate(context, context.cbId, context.cbFn) &&
        context.deep <= (options?.deep || 100)
      ) {
        pushToWaitedUpdate(context, context.cbId, context.cbFn);
      }

      plannedUpdateCreate()(context);
    });
  };

  reactorFn.destroy = () => {
    reaction.state.reactionsList = [];
    reaction = undefined as any;
  };

  return reactorFn as XReactor<T>;
};

export const reaction = (fn: ReactionFnInterface): void => {
  const reactionFn = () => {
    idFn += 1;

    let globalReactor: GlobalReactorInterface | null = {
      cbFn: fn,
      cbId: idFn,
      type: 'default',
      phase: PHASE_REACTIONS.create,
      isRunning: false,
      deep: 0,
      nextUpdateReactions: [],
      planned: false,
    };
    globalReactorEffect = globalReactor;
    globalReactor.isRunning = true;
    fn();
    globalReactor.isRunning = false;
    globalReactorEffect = null;
    globalReactor = null;
  };
  return reactionFn();
};

export const reactionComputed = <T>(
  fn: ReactionComputedFnInterface<T>
): XReactor<T> => {
  const reactionFn = () => {
    idFn += 1;

    let globalReactor: GlobalReactorInterface | null = {
      cbFn: fn,
      cbId: idFn,
      type: 'computed',
      phase: PHASE_REACTIONS.create,
      isRunning: false,
      deep: 0,
      nextUpdateReactions: [],
      planned: false,
    };
    globalReactorEffect = globalReactor;
    globalReactor.isRunning = true;
    const result = reactor(fn());
    console.log(result);
    globalReactor.isRunning = false;
    globalReactorEffect = null;
    globalReactor = null;
    return result;
  };
  return reactionFn();
};
