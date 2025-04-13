import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().nonempty(),
  category: z.string().nonempty(),
  description: z.string(),
});

export type TProduct = z.infer<typeof ProductSchema>;

export type TCategoryDescription = Omit<TProduct, 'id'>;
