import { Id } from '../types';

import { isToastIdValid } from '../utils';

export const enum ActionType {
  ADD,
  REMOVE
}
export type State = Array<Id>;
export type Action =
  | { type: ActionType.ADD; toastId: Id; staleId?: Id }
  | { type: ActionType.REMOVE; toastId?: Id };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.ADD:
      return [...state, action.toastId].filter(id => id !== action.staleId);
    case ActionType.REMOVE:
      return isToastIdValid(action.toastId)
        ? state.filter(id => id !== action.toastId)
        : [];
  }
}
