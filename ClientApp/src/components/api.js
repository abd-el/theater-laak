import axios from "axios";

export const api = axios.create({
    baseURL: window.location.origin,
    timeout: 1000,
    validateStatus: () => true
});