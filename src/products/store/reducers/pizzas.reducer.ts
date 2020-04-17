import { Action, createReducer, on } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';
import * as fromPizzas from '../actions/pizzas.action';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false,
};

const pizzaReducer = createReducer(
  initialState,
  on(fromPizzas.loadPizzas, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromPizzas.loadPizzasFail, (state) => ({
    ...state,
    loading: false,
    loaded: false,
  })),
  on(fromPizzas.loadPizzasSuccess, (state, { pizzas }) => {
    const entities = pizzas.reduce(
      (prev: { [id: number]: Pizza }, pizza) => ({
        ...prev,
        [pizza.id]: pizza,
      }),
      {
        ...state.entities,
      }
    );
    return {
      ...state,
      loading: false,
      loaded: true,
      entities,
    };
  }),
  on(
    fromPizzas.createPizzaSuccess,
    fromPizzas.updatePizzaSuccess,
    (state, { pizza }) => {
      const entities = {
        ...state.entities,
        [pizza.id]: pizza,
      };
      return {
        ...state,
        entities,
      };
    }
  ),
  on(fromPizzas.removePizzaSuccess, (state, { pizza }) => {
    const { [pizza.id]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities,
    };
  })
);

export function reducer(state: PizzaState | undefined, action: Action) {
  return pizzaReducer(state, action);
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
