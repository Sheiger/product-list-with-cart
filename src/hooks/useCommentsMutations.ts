import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"
import type { CommentFormValues } from "../schemas/commentSchema";
import { createComment, updateComment, deleteComment } from "../services/commentService";

export const useCommentsMutations = () => {
    const queryClient = useQueryClient()

    const createLocal = useMutation({
        mutationFn: (newComment: CommentFormValues) => createComment(newComment),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["comments", variables.productId]})
            toast.success("Comentario agregado exitosamente")
        },
        onError: () => toast.error("ERROR al prublicar comentario")
    });

    const updateLocal = useMutation({
        mutationFn: (data: { id: number; payload: CommentFormValues}) =>
            updateComment(data.id, data.payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["comments", variables.payload.productId]});
            toast.success("Comentario editado exitosamente")
        },
    })

    const deleteLocal = useMutation({
        mutationFn: (data: {id: number; productId: number}) => deleteComment(data.id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["comments", variables.productId]})
            toast.success("Comentario eliminado")
        }
    })

    return { createLocal, updateLocal, deleteLocal}
}