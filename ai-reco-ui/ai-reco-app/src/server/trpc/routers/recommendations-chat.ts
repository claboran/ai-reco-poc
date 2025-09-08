import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../trpc';
import { ChatRequestSchema } from '../../../shared/product.model';

export const recommendationsChatRouter = router({
  chat: publicProcedure
    .input(ChatRequestSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.recommendationChatApi.postChatMessage({
          chatRequest: input,
        });
      } catch (error) {
        console.error('Error sending chat message:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to process chat message',
          cause: error,
        });
      }
    }),
});
