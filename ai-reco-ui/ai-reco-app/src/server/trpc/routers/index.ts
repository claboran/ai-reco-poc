import { router } from '../trpc';
import { productsRouter } from "./products";
import { recommendationsRouter } from "./recommendations";
import { recommendationsChatRouter } from "./recommendations-chat";

export const appRouter = router({
  products: productsRouter,
  recommendations: recommendationsRouter,
  recommendationsChat: recommendationsChatRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
