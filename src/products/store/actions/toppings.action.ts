import { createAction, props } from '@ngrx/store';

import { Topping } from '../../models/topping.model';

export const loadToppings = createAction('[Products] Load Toppings');

export const loadToppingsFail = createAction(
  '[Products] Load Toppings Fail',
  props<{ error: any }>()
);

export const loadToppingsSuccess = createAction(
  '[Products] Load Toppings Success',
  props<{ toppings: Topping[] }>()
);

export const visualiseTopping = createAction(
  '[Products] Visualise Toppings',
  props<{ toppingIds: number[] }>()
);
