import { TChatMessage } from "../../shared/product.model";

export type TChatState = 'idle' | 'loading' | 'error';

export type RecommendationChatStoreModel = {
  chatState: TChatState;
  currentQuery: string;
  history: TChatMessage[];
};

export const initialRecommendationChatStoreModel: RecommendationChatStoreModel = {
  chatState: 'idle',
  currentQuery: '',
  history: [],
};
