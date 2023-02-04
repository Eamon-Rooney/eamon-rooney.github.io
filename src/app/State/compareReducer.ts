import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { ElementList } from 'app/interfaces/bootstrap';
import { Pick, PicksList } from 'app/interfaces/picks';
import { Standings } from 'app/interfaces/standings';
import { addLeagueTeams, addTeamPicks, savePlayers } from '../State/compareActions';

export interface CompareState {
  elements: ElementList;
  teams: Teams[];
  rivals: Standings["results"];
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
  rivals: [],
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
  on(addLeagueTeams, (state, {payload}) => ({
    ...state,
    rivals: payload
  })),
);

export function reducer(state: CompareState | undefined, action: Action | any) {

  if (state?.teams.find(teams => Object.keys(teams) == action.teamID)) {
    return state;
  } else {
    return _compareReducer(state, action);
  }

}
