import { RecommendationChatStoreModel } from "./recommendation-chat-store.model";
import { produce } from "immer";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { initialRecommendationChatStoreModel } from "./recommendation-chat-store.model";
import { injectTrpcClient } from "../../trpc-client";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";


const chatRequestReducer = (
  state: RecommendationChatStoreModel,
  query: string,
) => produce(state, (draft) => {
  draft.currentQuery = query;
  draft.chatState = 'loading';
});

const chatAnswerReducer = (
  state: RecommendationChatStoreModel,
  query: string,
  answer: string,
) => produce(state, (draft) => {
  draft.history.push({role: 'user', content: query});
  draft.history.push({role: 'assistant', content: answer});
  draft.chatState = 'idle';
});

const chatErrorReducer = (
  state: RecommendationChatStoreModel,
) => produce(state, (draft) => {
  draft.chatState = 'error';
});

const resetChaRequestReducer = (
  state: RecommendationChatStoreModel,
) => produce(state, (draft) => {
  draft.currentQuery = '';
  draft.chatState = 'idle';
});

const clearChatHistoryReducer = (
  state: RecommendationChatStoreModel,
) => produce(state, (draft) => {
  draft.history = [];
  draft.currentQuery = '';
  draft.chatState = 'idle';
});

export const RecommendationChatStore = signalStore(
  {providedIn: "root"},
  withState(initialRecommendationChatStoreModel),
  withMethods((store, trcClient = injectTrpcClient()) => ({
    sendChatRequest: rxMethod<{ query: string }>(pipe(
      tap(query => console.log('query: ', query)),
      tap(query => patchState(store, state => chatRequestReducer(state, query.query))),
      switchMap(({query}) => trcClient.recommendationsChat.chat.mutate({history: [...store.history()], query})
        .pipe(
          tap(chatResult => console.log('recommendation for query', query, chatResult)),
          tapResponse({
            next: chatResult => patchState(store, state => chatAnswerReducer(state, query, chatResult.answer)),
            error: error => {
              console.error('Error fetching recommendations: ', error);
              patchState(store, state => chatErrorReducer(state));
            },
          }),
        )),
    )),
    clearChat() {
      patchState(store, state => clearChatHistoryReducer(state));
    },
    clearQuery() {
      patchState(store, state => resetChaRequestReducer(state));
    },
  })),
);
