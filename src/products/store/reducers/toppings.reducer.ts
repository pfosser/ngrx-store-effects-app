import { Action, createReducer, on } from '@ngrx/store';

import { Topping } from '../../models/topping.model';
import * as toppingActions from '../actions/toppings.action';

export interface ToppingState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: [],
};

const toppingReducer = createReducer(
  initialState,
  on(toppingActions.loadToppings, (state) => ({
    ...state,
    loading: true,
  })),
  on(toppingActions.loadToppingsFail, (state) => ({
    ...state,
    loading: false,
    loaded: false,
  })),
  on(toppingActions.loadToppingsSuccess, (state, { toppings }) => {
    const entities = toppings.reduce(
      (prev, topping) => ({
        ...prev,
        [topping.id]: topping,
      }),
      { ...state.entities }
    );
    return {
      ...state,
      loading: false,
      loaded: true,
      entities,
    };
  }),
  on(toppingActions.visualiseTopping, (state, { toppingIds }) => {
    return {
      ...state,
      selectedToppings: toppingIds,
    };
  })
);

export function reducer(state: ToppingState | undefined, action: Action) {
  return toppingReducer(state, action);
}

export const getToppingsEntities = (state: ToppingState) => state.entities;
export const getToppingsLoading = (state: ToppingState) => state.loading;
export const getToppingsLoaded = (state: ToppingState) => state.loaded;
export const getSelectedToppings = (state: ToppingState) =>
  state.selectedToppings;
