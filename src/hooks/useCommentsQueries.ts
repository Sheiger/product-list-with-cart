import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/commentService";

export const useCommentsQueries = (productId: number) => {
    return useQuery({
        queryKey: ["comments", productId],
        queryFn: () => getComments(productId)
    })
}