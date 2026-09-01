import type { CommentFormValues } from "../schemas/commentSchema";

const STORAGE_KEY = "app_comments"

export const getComments = async (productId?: number) => {
    const data = localStorage.getItem(STORAGE_KEY)
    const comments: CommentFormValues[] = data ? JSON.parse(data) : []

    if (productId) {
        return comments.filter(c => c.productId === productId)
    }

    return comments;
}

export const createComment = async ( comment: CommentFormValues) => {
    const data = localStorage.getItem(STORAGE_KEY)
    const comments: CommentFormValues[] = data ? JSON.parse(data) : []

    const newComment = { ...comment, id: Date.now()}
    comments.push(newComment)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
    return newComment
}

export const updateComment = async (id: number, payload: CommentFormValues) => {
    const data = localStorage.getItem(STORAGE_KEY);
    let comments: CommentFormValues[] = data ? JSON.parse(data) : [];

    comments = comments.map(c => c.id === id ? { ...payload, id} : c)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
    return payload
}

export const deleteComment = async (id: number) => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return;

    const comments: CommentFormValues[] = JSON.parse(data)
    const filtered = comments.filter(c => c.id !== id)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}