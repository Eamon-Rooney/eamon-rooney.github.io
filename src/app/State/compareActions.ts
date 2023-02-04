import { createAction } from '@ngrx/store';
import { ElementList } from 'app/interfaces/bootstrap';
import { PicksList } from 'app/interfaces/picks';
import { Standings } from 'app/interfaces/standings';

export const savePlayers = createAction('[Elements API] Add all Players',
(payload: ElementList) => ({ payload })
);
export const addTeamPicks = createAction('[Teams API] Add Initial Team',
(payload: PicksList, teamID: number, teamName: string) => ({ payload, teamID, teamName})
);
export const addLeagueTeams = createAction('[Standings API] Add Team Id and names',
(payload: Standings["results"]) => ({ payload})
);


