import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/toppings.selectors';

import { Topping } from '../../models/topping.model';
import { TestBed } from '@angular/core/testing';

describe('Toppings Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const toppings: Topping[] = [
    { id: 1, name: 'Bacon' },
    { id: 2, name: 'Pepperoni' },
    { id: 3, name: 'Tomato' },
  ];

  const entities = {
    1: toppings[0],
    2: toppings[1],
    3: toppings[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers),
        }),
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getToppingsEntities', () => {
    it('should return the toppings as entities', () => {
      let result;
      store.select(fromSelectors.getToppingsEntities).subscribe((value) => {
        result = value;
      });

      expect(result).toEqual({});

      store.dispatch(fromActions.ToppingActions.loadSuccess({ toppings }));

      expect(result).toEqual(entities);
    });
  });

  describe('getSelectedToppings', () => {
    it('should return the toppings as ids', () => {
      let result;
      store.select(fromSelectors.getSelectedToppings).subscribe((value) => {
        result = value;
      });

      store.dispatch(fromActions.ToppingActions.loadSuccess({ toppings }));

      expect(result).toEqual([]);

      store.dispatch(
        fromActions.ToppingActions.visualise({ toppingIds: [1, 3] })
      );

      expect(result).toEqual([1, 3]);
    });
  });

  describe('getAllToppings', () => {
    it('should return toppings as an array', () => {
      let result;

      store
        .select(fromSelectors.getAllToppings)
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      store.dispatch(fromActions.ToppingActions.loadSuccess({ toppings }));

      expect(result).toEqual(toppings);
    });
  });

  describe('getToppingsLoaded', () => {
    it('should return the toppings loaded state', () => {
      let result;

      store
        .select(fromSelectors.getToppingsLoaded)
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(fromActions.ToppingActions.loadSuccess({ toppings: [] }));

      expect(result).toEqual(true);
    });
  });

  describe('getToppingsLoading', () => {
    it('should return the toppings loading state', () => {
      let result;

      store
        .select(fromSelectors.getToppingsLoading)
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(fromActions.ToppingActions.load());

      expect(result).toEqual(true);
    });
  });
});
