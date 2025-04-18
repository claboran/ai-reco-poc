import { inferAsyncReturnType } from '@trpc/server';
import { Configuration, ProductRecommendationApi } from "../openapi-client";
import { productService } from "../service/ProductService";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

const config = new Configuration({
  basePath: process.env['API_URL'] || 'http://localhost:9944',
});

export const recommendationApi = new ProductRecommendationApi(config);

export const createContext = () => ({
  recommendationApi: recommendationApi,
  productService: productService,
});
export type Context = inferAsyncReturnType<typeof createContext>;
