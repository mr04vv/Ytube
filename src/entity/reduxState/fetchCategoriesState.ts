import { Category } from 'entity/entity/category';
import { ReduxStatus } from 'entity/union/reduxStatus';

export interface FetchCategoriesState {
  data: {} | Category[];
  loading: boolean;
  status: ReduxStatus;
}
