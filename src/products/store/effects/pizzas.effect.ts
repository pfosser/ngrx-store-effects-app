import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as fromServices from '../../services';
import * as pizzaActions from '../actions/pizzas.action';

@Injectable()
export class PizzasEffects {
  loadPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.loadPizzas),
      switchMap(() =>
        this.pizzaService.getPizzas().pipe(
          map((pizzas) => pizzaActions.loadPizzasSuccess({ pizzas })),
          catchError((error) => of(pizzaActions.loadPizzasFail({ error })))
        )
      )
    )
  );

  createPizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.createPizza),
      map((action) => action.pizza),
      switchMap((pizza) =>
        this.pizzaService.createPizza(pizza).pipe(
          map((newPizza) =>
            pizzaActions.createPizzaSuccess({ pizza: newPizza })
          ),
          catchError((error) => of(pizzaActions.createPizzaFail({ error })))
        )
      )
    )
  );

  createPizzaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.createPizzaSuccess),
      map((action) => action.pizza),
      map((pizza) =>
        fromRoot.go({
          payload: { path: ['/products', pizza.id] },
        })
      )
    )
  );

  updatePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.updatePizza),
      map((action) => action.pizza),
      switchMap((pizza) =>
        this.pizzaService.updatePizza(pizza).pipe(
          map((editedPizza) =>
            pizzaActions.updatePizzaSuccess({ pizza: editedPizza })
          ),
          catchError((error) => of(pizzaActions.updatePizzaFail({ error })))
        )
      )
    )
  );

  removePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.removePizza),
      map((action) => action.pizza),
      switchMap((pizza) =>
        this.pizzaService.removePizza(pizza).pipe(
          map(() => pizzaActions.removePizzaSuccess({ pizza })),
          catchError((error) => of(pizzaActions.removePizzaFail({ error })))
        )
      )
    )
  );

  handlePizzaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.updatePizzaSuccess, pizzaActions.removePizzaSuccess),
      map(() => fromRoot.go({ payload: { path: ['/products'] } }))
    )
  );

  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}
}
