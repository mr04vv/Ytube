import { fetchCategoryList } from 'api/categories/fetchCategoryList';
import { createActionCreator, createReducer } from 'deox';
import { FetchCategoriesState } from 'entity/reduxState/fetchCategoriesState';
import { Dispatch } from 'redux';

const MODULE_NAME = 'FETCH_CATEGORY_LIST';
const initialState: FetchCategoriesState = {
  data: {},
  loading: false,
  status: 'notInitialized'
};

// Constants
export const FETCH_CATEGORY_LIST_SUCCESS = `redux/${MODULE_NAME}/FETCH_CATEGORY_LIST_SUCCESS`;

// Actions
export const fetchSuccess = createActionCreator(FETCH_CATEGORY_LIST_SUCCESS, resolve => (res: object) => resolve(res));

// Reducer
const categoryList = createReducer(initialState, handleAction => [
  handleAction(fetchSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default categoryList;

// GET Data
export const fetchCategories = () => async (dispatch: Dispatch) => {
  const res = await fetchCategoryList().catch((err) => {
    throw err;
  });
  dispatch(fetchSuccess(res));
  return res;
};
