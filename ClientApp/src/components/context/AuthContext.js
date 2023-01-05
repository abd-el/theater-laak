import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function userReducer(authState, action) {
    switch (action.type) {
        case 'SET_STATE':
            return action.payload
            
        case 'DELETE_STATE':
            return null;
            
        default:
            return authState;
    }
}


export function AuthContextProvider({ children }) {
    const [authState, dispatch] = useReducer(userReducer, null);


    useEffect(() => {

        const storage = JSON.parse(localStorage.getItem('authState'));
        
        if (storage != null) {
            dispatch({ type: 'SET_STATE', payload: storage });
        }

    }, []
    );


    return (
        <AuthContext.Provider value={{ authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}