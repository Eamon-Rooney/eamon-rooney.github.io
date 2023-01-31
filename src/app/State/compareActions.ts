import { createAction } from '@ngrx/store';
import { ElementList } from 'app/interfaces/bootstrap';
import { PicksList } from 'app/interfaces/picks';

export const savePlayers = createAction('[Elements API] Add all Players',
(payload: ElementList) => ({ payload })
);
export const addTeamPicks = createAction('[Teams API] Add Initial Team',
(payload: PicksList, teamID: number, teamName: string) => ({ payload, teamID, teamName})
);


