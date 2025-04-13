import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const recommendationsRouter = router({
  recommend: publicProcedure
    .input(
      z.object({
        query: z.string().min(3),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.recommendationApi.getProductRecommendations({
          searchRequest: {query: input.query}
        });
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch product recommendations',
          cause: error,
        });
      }
    }),
});
