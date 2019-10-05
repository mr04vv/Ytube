import { createActionCreator, createReducer } from 'deox';

const MODULE_NAME = 'menuList';

interface StateInterface {
  drinks: firebase.firestore.DocumentData[];
  foods: firebase.firestore.DocumentData[];
  drinkCategories: firebase.firestore.DocumentData[];
  foodCategories: firebase.firestore.DocumentData[];
}

const initialState: StateInterface = {
  drinks: [],
  foods: [],
  drinkCategories: [],
  foodCategories: [],
};

// Constants
export const GET_MENUS = `redux/${MODULE_NAME}`;
export const GET_DRINK_SUCCESS = `redux/${MODULE_NAME}/GET_DRINK_SUCCESS`;
export const GET_DRINK_FAIL = `redux/${MODULE_NAME}/GET_DRINK_FAIL`;
export const GET_FOOD_SUCCESS = `redux/${MODULE_NAME}/GET_FOOD_SUCCESS`;
export const GET_FOOD_FAIL = `redux/${MODULE_NAME}/GET_FOOD_FAIL`;
export const GET_DRINK_CATEGORY_SUCCESS = `redux/${MODULE_NAME}/GET_DRINK_CATEGORY_SUCCESS`;
export const GET_DRINK_CATEGORY_FAIL = `redux/${MODULE_NAME}/GET_DRINK_CATEGORY_FAIL`;
export const GET_FOOD_CATEGORY_SUCCESS = `redux/${MODULE_NAME}/GET_FOOD_CATEGORY_SUCCESS`;
export const GET_FOOD_CATEGORY_FAIL = `redux/${MODULE_NAME}/GET_FOOD_CATEGORY_FAIL`;
// Actions
export const isLoading = createActionCreator(GET_MENUS);
export const getDrinkListSuccess = createActionCreator(GET_DRINK_SUCCESS, resolve => (res: firebase.firestore.DocumentData[]) => resolve(res));
export const getFoodListSuccess = createActionCreator(GET_FOOD_SUCCESS, resolve => (res: firebase.firestore.DocumentData[]) => resolve(res));
export const getDrinkCategoryListSuccess = createActionCreator(GET_DRINK_CATEGORY_SUCCESS, resolve => (res: firebase.firestore.DocumentData[]) => resolve(res));
export const getFoodCategoryListSuccess = createActionCreator(GET_FOOD_CATEGORY_SUCCESS, resolve => (res: firebase.firestore.DocumentData[]) => resolve(res));
export const getDrinkListFail = createActionCreator(GET_DRINK_FAIL, resolve => (err: string) => resolve(err));
export const getFoodListFail = createActionCreator(GET_FOOD_FAIL, resolve => (err: string) => resolve(err));
export const getDrinkCategoryListFail = createActionCreator(GET_DRINK_CATEGORY_FAIL, resolve => (err: string) => resolve(err));
export const getFoodCategoryListFail = createActionCreator(GET_FOOD_CATEGORY_FAIL, resolve => (err: string) => resolve(err));

// Reducer
const menuList = createReducer(initialState, handleAction => [
  handleAction(isLoading, state => ({
    ...state,
    loading: true,
  })),
  handleAction(getDrinkListSuccess, (state, action) => ({
    ...state,
    drinks: action.payload,
    loading: false,
    status: 'success',
  })),
  handleAction(getDrinkListFail, state => ({
    ...state,
    loading: false,
    status: 'fail',
  })),
  handleAction(getFoodListSuccess, (state, action) => ({
    ...state,
    foods: action.payload,
    loading: false,
    status: 'success',
  })),
  handleAction(getFoodListFail, state => ({
    ...state,
    loading: false,
    status: 'fail',
  })),
  handleAction(getDrinkCategoryListSuccess, (state, action) => ({
    ...state,
    drinkCategories: action.payload,
    loading: false,
    status: 'success',
  })),
  handleAction(getDrinkCategoryListFail, state => ({
    ...state,
    loading: false,
    status: 'fail',
  })),
  handleAction(getFoodCategoryListSuccess, (state, action) => ({
    ...state,
    foodCategories: action.payload,
    loading: false,
    status: 'success',
  })),
  handleAction(getFoodCategoryListFail, state => ({
    ...state,
    loading: false,
    status: 'fail',
  })),
]);

export default menuList;
