import { TProduct } from "../../shared/product.model";

export type TRecommendationStoreModel = {
  query: string;
  recommendations: TProduct[];
};

export const initialRecommendationStoreModel: TRecommendationStoreModel = {
  query: '',
  recommendations: [],
};
