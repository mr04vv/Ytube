import { Game } from 'entity/entity/game';
import { ReduxStatus } from 'entity/union/reduxStatus';

export interface FetchGamesState {
  data: {} | Game[];
  loading: boolean;
  status: ReduxStatus;
}
