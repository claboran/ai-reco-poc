import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const productsRouter = router({
  findOne: publicProcedure.input(
    z.object({
      id: z.string().nonempty(),
    }),
  ).query(
    ({input, ctx}) =>
      ctx.productService.getProducts(input.id)
  ),
});
