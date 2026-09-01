import axios from "axios"

export const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_URL_API}`,
    headers: { 
        "Content-Type": "application/json"
    }
})