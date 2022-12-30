import { useState, createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const api = axios.create({
    baseURL: window.location.origin,
    timeout: 1000,
    validateStatus: () => true
});

export function userReducer(user, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                user: action.payload
            }
        case 'DELETE_USER':
            return {
                user: null
            }
        default:
            return user;
    }
}


export function AuthContextProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, '');


    return (
        <AuthContext.Provider value={{ user, dispatch, api }}>
            {children}
        </AuthContext.Provider>
    );
}