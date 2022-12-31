import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const api = axios.create({
    baseURL: window.location.origin,
    timeout: 1000,
    validateStatus: () => true
});

export function userReducer(state, action) {
    switch (action.type) {
        case 'SET_STATE':
            return action.payload
            
        case 'DELETE_STATE':
            return null;
            
        default:
            return state;
    }
}


export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, null);


    useEffect(() => {

        const storage = JSON.parse(localStorage.getItem('state'));
        
        if (storage != null) {
            dispatch({ type: 'SET_STATE', payload: storage });
        }

    }, []
    );


    return (
        <AuthContext.Provider value={{ state, dispatch, api }}>
            {children}
        </AuthContext.Provider>
    );
}