import { Id } from '../types';

import { hasToastId } from '../utils';

export type State = Array<Id>;
export type Action =
  | { type: 'ADD'; toastId: Id; staleId?: Id }
  | { type: 'REMOVE'; toastId?: Id };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toastId].filter(id => id !== action.staleId);
    case 'REMOVE':
      return hasToastId(action.toastId)
        ? state.filter(id => id !== action.toastId)
        : [];
  }
}
