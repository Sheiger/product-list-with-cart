import axios from "axios"

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    headers: { 
        "Content-Type": "application/json"
    }
})