import { router } from '../trpc';
import { productsRouter } from "./products";
import { recommendationsRouter } from "./recommendations";

export const appRouter = router({
  products: productsRouter,
  recommendations: recommendationsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
