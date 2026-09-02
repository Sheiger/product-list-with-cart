import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { commentSchema, type CommentFormValues } from "../../schemas/commentSchema";
import { useEffect } from "react";

interface CommentFormProps {
    productId: number;
    initialData?: CommentFormValues
    onSubmitForm: (data: CommentFormValues) => void
    isLoading: boolean
}

export default function CommentForm({ productId, initialData, onSubmitForm, isLoading}: CommentFormProps) {

    const defaultEmptyValues = {
        productId,
        author: "",
        content: "",
        rating: 5
    };

    const {register, handleSubmit, reset, formState: { errors, isSubmitSuccessful}} =
        useForm<CommentFormValues>({resolver: zodResolver(commentSchema),
                                    defaultValues: initialData || defaultEmptyValues
        })

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset(defaultEmptyValues);
        }
    }, [initialData, reset, productId]);

    useEffect(() => {
        if (isSubmitSuccessful && !initialData) {
            reset(defaultEmptyValues);
        }
    }, [isSubmitSuccessful, initialData, reset, productId])

    const onSubmit = (data: CommentFormValues) => {
        onSubmitForm(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="block text-sm font-semibold text-amber-950 mb-1">Tu nombre</label>
                <input type="text" {...register("author")} placeholder="Ej. Emerson Quispe"
                        className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 
                                    ${errors.author ? "border-red-500" : "border-orange-200"}`}/>
                { errors.author && <span className="text-red-500 text-xs mt-1 block">{errors.author.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-amber-950 mb-1">Clasificación</label>
                <select {...register("rating", {valueAsNumber: true})} className="w-full border border-orange-200 p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value={5}>⭐⭐⭐⭐⭐ ¡Me encantó!</option>
                    <option value={4}>⭐⭐⭐⭐ Muy bueno</option>
                    <option value={3}>⭐⭐⭐ Bueno</option>
                    <option value={2}>⭐⭐ Regular</option>
                    <option value={1}>⭐ No me gustó</option>
                </select>
                { errors.rating && <span className="text-red-500 text-xs mt-1 block">{errors.rating.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-amber-950 mb-1">Tu Opinión</label>
                <textarea {...register("content")} placeholder="¿Qué te pareció el sabor?" rows={4}
                    className={`w-full border p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500
                        ${errors.content ? "border-red-500" : "border-orange-200"}`}
                    />
                {errors.content && <span className="text-red-500 text-xs mt-1 block">{errors.content.message}</span>}
            </div>

            <button type="submit" disabled={isLoading}
                className="w-full bg-amber-800 text-white font-semibold py-3 rounded-lg hover:bg-amber-900 transition-colors disabled:opacity-70 flex justify-center items-center gap-2 mt-2">
                {isLoading && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {isLoading ? "Procesando..." : (initialData ? "Actualizar Opinión" : "Publicar Opinión")}
            </button>
        </form>
    )
}