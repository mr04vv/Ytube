import { Post } from 'entity/entity/post';
import { ReduxStatus } from '../union/reduxStatus';

export interface FetchPostsState {
  data: {
    posts?: Post[];
  };
  loading: boolean;
  status: ReduxStatus;
}
