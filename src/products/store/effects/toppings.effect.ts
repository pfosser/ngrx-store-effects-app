import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as fromToppings from '../actions/toppings.action';

@Injectable()
export class ToppingsEffects {
  loadToppings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromToppings.loadToppings),
      switchMap(() =>
        this.toppingService.getToppings().pipe(
          map((toppings) => fromToppings.loadToppingsSuccess({ toppings })),
          catchError((error) => of(fromToppings.loadToppingsFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private toppingService: fromServices.ToppingsService
  ) {}
}
