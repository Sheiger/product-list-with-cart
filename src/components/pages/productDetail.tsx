import { useParams, Link } from "react-router-dom"
import { useProduct } from "../../hooks/useProduct"
import { useCommentsQueries } from "../../hooks/useCommentsQueries"
import { useCommentsMutations } from "../../hooks/useCommentsMutations"
import { useState } from "react"
import type { CommentFormValues } from "../../schemas/commentSchema"
import CommentForm  from "../forms/CommentForm"
import ErrorState from "../states/ErrorState"
import NotFound from "./notFound"
import ConfirmDeleteComment from "../modals/ConfirmDeleteComment"


const ProductDetail = () => {

    const {id} = useParams()
    const productId = Number(id)

    const [editingComment, setEditingComment] = useState<CommentFormValues | undefined>(undefined) 
    const [commentToDelete, setCommentToDelete] = useState<number | null>(null)

    const { data: product, isLoading: isLoadingProduct, isError: isErrorProduct, refetch: refetchProduct } = useProduct(productId);
    const { data: comments, isLoading: isLoadingComments } = useCommentsQueries(productId);
    const { createLocal, updateLocal, deleteLocal } = useCommentsMutations();

    const handleAddComment = (data: CommentFormValues) => {
        if (editingComment) {
            updateLocal.mutate(
                { id: editingComment.id!, payload: {...data, productId}},
                { onSuccess: () => setEditingComment(undefined)}
            )
        } else {
            createLocal.mutate({ ...data, productId })
        }
    }

    const handleConfirmDelete = () => {
        if (commentToDelete !== null) {
            deleteLocal.mutate(
                { id: commentToDelete, productId},
                { onSuccess: () => setCommentToDelete(null)}
            )
        }
    }

    if (isLoadingProduct) 
        return <div className="text-center pt-24 text-amber-900 font-semibold">Cargando producto...</div>
    if (isErrorProduct) 
        return <ErrorState onRetry={refetchProduct}/>
    if (!product)
        return <NotFound />

    return (
        <div className="min-h-screen bg-orange-50 mx-auto pt-16 px-8 pb-16">
            <Link to="/" className="text-sm underline font-semibold text-amber-900 hover:text-amber-700">
                &larr; Volver
            </Link>
            
            <div className="flex justify-center w-full mt-4">
                <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full">
                    <img src={product.image} alt={product.name} className="rounded-2xl w-full object-cover aspect-square shadow-sm" />
                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-semibold text-yellow-700 tracking-wide uppercase">{product.category}</p>
                        <h1 className="text-4xl text-amber-900 font-bold mt-2">{product.name}</h1>
                        <p className="text-2xl text-amber-600 font-bold mt-4">${product.price.toFixed(2)}</p>
                        <p className="text-gray-600 mt-6">
                            Delicioso postre preparado con los mejores ingredientes. 
                            Perfecto para acompañar tus tardes.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto border-t border-amber-200 pt-8 mt-12">
                <h2 className="text-3xl font-bold text-amber-900 mb-8">Opiniones</h2>
                
                <div className="grid gap-12 md:grid-cols-2">
                    <div>
                        {isLoadingComments ? (
                            <p className="text-amber-700">Cargando comentarios...</p>
                        ) : comments && comments.length > 0 ? (
                            <ul className="flex flex-col gap-4">
                                {comments.map((comment) => (
                                    <li key={comment.id} className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <strong className="text-amber-950 font-semibold">{comment.author}</strong>
                                            <span className="text-yellow-500 font-bold bg-yellow-50 px-2 py-1 rounded-lg text-sm">
                                                ★ {comment.rating}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{comment.content}</p>
                                        <div className="flex gap-4 mt-2">
                                            <button 
                                                onClick={() => setEditingComment(comment)}
                                                className="text-xs font-semibold text-blue-500 hover:text-blue-700 transition-colors">
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => setCommentToDelete(comment.id!)}
                                                className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                                                Eliminar
                                            </button>
                                        </div>
                                        
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center bg-white p-8 rounded-2xl border border-orange-100">
                                <span className="text-4xl block mb-2">✍️</span>
                                <p className="text-gray-500 font-medium">Aún no hay opiniones.</p>
                                <p className="text-sm text-gray-400">¡Sé el primero en compartir qué te pareció!</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 h-fit">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-amber-900">
                                {editingComment ? "Editar comentario" : "Deja tu comentario"}
                            </h3>
                            
                            {editingComment && (
                                <button 
                                    onClick={() => setEditingComment(undefined)}
                                    className="text-sm text-gray-500 hover:text-gray-700 underline">
                                    Cancelar
                                </button>
                            )}
                        </div>
                        <CommentForm 
                            key={editingComment?.id || 'new'}
                            productId={productId} 
                            initialData={editingComment}
                            onSubmitForm={handleAddComment} 
                            isLoading={createLocal.isPending || updateLocal.isPending} 
                        />
                    </div>
                </div>
            </div>
            <ConfirmDeleteComment 
                isOpen={commentToDelete !== null}
                onClose={() => setCommentToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Eliminar Opinión"
                message="¿Estás seguro de que deseas eliminar este comentario? Esta acción no se puede deshacer."
                isPending={deleteLocal.isPending}
            />
        </div>
    )
}

export default ProductDetail