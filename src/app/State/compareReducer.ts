import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { ElementList } from 'app/interfaces/bootstrap';
import { Pick, PicksList } from 'app/interfaces/picks';
import { addTeamPicks, savePlayers } from '../State/compareActions';

export interface CompareState {
  elements: ElementList;
  teams: Teams[];
}

export interface Teams {
  [key: number]: PlayerPicks;
}

export interface PlayerPicks {
  name: string;
  league: PicksList;
}

const initialState: CompareState = {
  elements: [],
  teams: [],
  // elements: [],
  // teams: [{
  // 0: {
  //   name: '',
  //   league: {
  //     active_chip: '',
  //     automatic_subs: [],
  //     entry_history: {
  //     event: 0,
  //     points: 0,
  //     total_points: 0,
  //     rank: 0,
  //     rank_sort: 0,
  //     overall_rank: 0,
  //     bank: 0,
  //     value: 0,
  //     event_transfers: 0,
  //     event_transfers_cost: 0,
  //     points_on_bench: 0,
  //     },
  //     picks: []
  //   }
  // }}]
};

const _compareReducer = createReducer(initialState,
  on(savePlayers, (state, {payload}) => ({
    ...state,
    elements: payload
  })),
  on(addTeamPicks, (state, {payload, teamID, teamName}) => ({
    ...state,
    teams: [...state.teams, {
      [teamID]: {
        name: teamName,
        league: payload
      }
    }]
  })),
);

export function reducer(state: CompareState | undefined, action: Action) {
  return _compareReducer(state, action);
}
