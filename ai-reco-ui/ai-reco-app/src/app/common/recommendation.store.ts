import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { initialRecommendationStoreModel, TRecommendationStoreModel } from "./recommendation-store.model";
import { injectTrpcClient } from "../../trpc-client";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { produce } from "immer";
import { TProduct } from "../../shared/product.model";
import { tapResponse } from "@ngrx/operators";


const queryStateReducer = (state: TRecommendationStoreModel, payload: string) =>
  produce(state, draft => {
    draft.query = payload;
  });

const queryResultReducer = (state: TRecommendationStoreModel, payload: TProduct[]) =>
  produce(state, draft => {
    draft.recommendations = payload;
  });

const resetRecommendationReducer = (state: TRecommendationStoreModel) =>
  produce(state, draft => {
    draft.query = '';
    draft.recommendations = [];
  });

export const RecommendationStore = signalStore(
  { providedIn: "root" },
  withState(initialRecommendationStoreModel),
  withMethods((store, trcClient = injectTrpcClient()) => ({
    queryRecommendations: rxMethod<{query: string}>(pipe(
      tap(query => console.log('query: ', query)),
      tap(query => patchState(store, state => queryStateReducer(state, query.query))),
      switchMap(({query}) => trcClient.recommendations.recommend.query({query}).pipe(
        tap(recommendation => console.log('recommendation: ', recommendation)),
        tapResponse({
          next: recommendation => patchState(store, state => queryResultReducer(state, recommendation)),
          error: error => console.error('Error fetching recommendations: ', error),
        }),
      )),
    )),
    resetRecommendation: () => patchState(store, state => resetRecommendationReducer(state)),
  })),
);
