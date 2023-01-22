import { createAction } from '@ngrx/store';
import { ElementList } from 'app/interfaces/bootstrap';

export const savePlayers = createAction('[Elements API] Add all Players',
(payload: ElementList) => ({ payload })
);

