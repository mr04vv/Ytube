import { User } from 'entity/entity/user';
import { ReduxStatus } from '../union/reduxStatus';

export interface FetchMeState {
  data: {} | User;
  loading: boolean;
  status: ReduxStatus;
}
