import { z } from "zod";

export const commentSchema = z.object({
    id: z.number().optional(),
    productId: z.number(),
    author: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    content: z.string().min(10, "El comentario debe ser mas descriptivo"),
    rating: z.number().min(1).max(5)
})

export type CommentFormValues = z.infer<typeof commentSchema>;