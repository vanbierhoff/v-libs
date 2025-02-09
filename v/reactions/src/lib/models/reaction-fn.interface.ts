import { XReactor } from '../reactions/models/reactions.interface';

export type ReactionFnInterface = () => void;
export type ComputedFnInterface = <T>() => XReactor<T>;
export type ReactionComputedFnInterface<T = unknown> = () => T;

export type UnionReactionFnInterface<T = unknown> =
  | ReactionFnInterface
  | ReactionComputedFnInterface<T>;
