import { ChatMessageRoleEnum as OpenApiChatMessageRoleEnum } from '../server/openapi-client/models/ChatMessage';
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().nonempty(),
  category: z.string().nonempty(),
  description: z.string(),
});

// Chat types and schemas aligned with OpenAPI models
export const ChatMessageRoleEnum = z.enum([
  OpenApiChatMessageRoleEnum.User,
  OpenApiChatMessageRoleEnum.Assistant
]);

export const ChatMessageSchema = z.object({
  role: ChatMessageRoleEnum,
  content: z.string(),
});

export const ChatRequestSchema = z.object({
  history: z.array(ChatMessageSchema),
  query: z.string(),
});

export const ChatResponseSchema = z.object({
  answer: z.string(),
  recommendedProducts: z.array(ProductSchema),
});

export type TProduct = z.infer<typeof ProductSchema>;
export type TChatMessage = z.infer<typeof ChatMessageSchema>;
export type TChatRequest = z.infer<typeof ChatRequestSchema>;
export type TChatResponse = z.infer<typeof ChatResponseSchema>;

export type TCategoryDescription = Omit<TProduct, 'id'>;
