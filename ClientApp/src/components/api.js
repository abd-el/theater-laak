import axios from "axios";

export const backendApi = axios.create({
    baseURL: window.location.origin,
    timeout: 2000,
    validateStatus: () => true
});