import { Action, createReducer, on } from '@ngrx/store';
import { ElementList } from 'app/interfaces/bootstrap';
import { savePlayers } from '../State/compareActions';

export interface State {
  elements: ElementList;
}

const initialState: State = {
  elements: []
};

const _compareReducer = createReducer(initialState,
  on(savePlayers, (state, {payload}) => ({
    ...state,
    elements: payload
  }))
);

export function reducer(state: State | undefined, action: Action) {
  console.log("reducer state", state);
  console.log("reducer action", action);
  return _compareReducer(state, action);
}
