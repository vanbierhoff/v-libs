import { UnionReactionFnInterface } from "../models/reaction-fn.interface";
import { stackItem } from "../models/reaction-parameters";
import { GlobalReactorInterface } from "./models/reactions.interface";





export const isWaitUpdate = (context: GlobalReactorInterface, id: number, fn: UnionReactionFnInterface) => {
  return context!.nextUpdateReactions!.some(item => item.id === id);
};


export const pushToWaitedUpdate = (context: GlobalReactorInterface, id: number, fn: UnionReactionFnInterface) => {
  context.nextUpdateReactions!.push({ id, fn });
};

export const removeToWaitedUpdate = (context: GlobalReactorInterface, id: number, fn: UnionReactionFnInterface) => {
  context.nextUpdateReactions = context.nextUpdateReactions!
    .filter(item => item.id !== id);
};

export const plannedUpdateCreate = () => {
  return (context: GlobalReactorInterface) => {
    if (context.planned) {
      return;
    }
    context.planned = true;
    const task = () => {
      context!.nextUpdateReactions!.forEach((item, _i) => {
        item.fn();
      });
    };
    stackItem.add(task, () => {
      context.planned = false;
      context.nextUpdateReactions = [];
    });

  };
};

