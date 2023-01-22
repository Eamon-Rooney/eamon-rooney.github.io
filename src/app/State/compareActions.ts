import { createAction } from '@ngrx/store';
import { ElementList } from 'app/interfaces/bootstrap';
import { PicksList } from 'app/interfaces/picks';

export const savePlayers = createAction('[Elements API] Add all Players',
(payload: ElementList) => ({ payload })
);
export const addTeamPicks = createAction('[Teams API] Add next Team',
(payload: PicksList) => ({ payload })
);

