import { User } from 'entity/entity/user';
import { LoginStatus } from '../union/reduxStatus';

export interface FetchMeState {
  data: {} | User;
  loading: boolean;
  status: LoginStatus;
}
