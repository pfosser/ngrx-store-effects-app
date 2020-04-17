import { createAction, props } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

// Load pizzas
export const loadPizzas = createAction('[Products] Load Pizzas');
export const loadPizzasFail = createAction(
  '[Products] Load Pizzas Fail',
  props<{ error: any }>()
);
export const loadPizzasSuccess = createAction(
  '[Products] Load Pizzas Success',
  props<{ pizzas: Pizza[] }>()
);

// Create pizza
export const createPizza = createAction(
  '[Products] Create Pizza',
  props<{ pizza: Pizza }>()
);
export const createPizzaFail = createAction(
  '[Products] Create Pizza Fail',
  props<{ error: any }>()
);
export const createPizzaSuccess = createAction(
  '[Products] Create Pizza Success',
  props<{ pizza: Pizza }>()
);

// Update pizza
export const updatePizza = createAction(
  '[Products] Update Pizza',
  props<{ pizza: Pizza }>()
);
export const updatePizzaFail = createAction(
  '[Products] Update Pizza Fail',
  props<{ error: any }>()
);
export const updatePizzaSuccess = createAction(
  '[Products] Update Pizza Success',
  props<{ pizza: Pizza }>()
);

// Remove pizza
export const removePizza = createAction(
  '[Products] Remove Pizza',
  props<{ pizza: Pizza }>()
);
export const removePizzaFail = createAction(
  '[Products] Remove Pizza Fail',
  props<{ error: any }>()
);
export const removePizzaSuccess = createAction(
  '[Products] Remove Pizza Success',
  props<{ pizza: Pizza }>()
);
