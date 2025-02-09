import {
  ReactionFnInterface,
  UnionReactionFnInterface,
} from '../../models/reaction-fn.interface';
import { PHASE_REACTIONS } from './reactions.const';

export type ReactorFn<T> = () => T;

export interface XReactor<T> extends ReactorFn<T> {
  set(v: T): void;

  destroy(): void;
}

export interface GlobalReactorInterface {
  cbFn: ReactionFnInterface;
  cbId: number;
  type: 'computed' | 'default';
  phase: (typeof PHASE_REACTIONS)[keyof typeof PHASE_REACTIONS];
  isRunning?: boolean;
  deep: number;
  planned: boolean;
  nextUpdateReactions: Array<{
    fn: UnionReactionFnInterface;
    id: number;
  }>;
}

export interface GlobalComputedReactorInterface extends GlobalReactorInterface {
  linkedReactions: Array<GlobalComputedReactorInterface>;
}

export interface ReactorStateInterface {
  reactionsList: Array<GlobalReactorInterface>;
}
