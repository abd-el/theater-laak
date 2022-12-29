import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);


    const api = axios.create(
        {
            baseURL: window.location.origin,
            timeout: 1000
        }
    );


    async function login(_username, _password, callback) {
        const payload = {
            username: _username,
            password: _password
        }

        try {
            const response = await api.post('/api/login', payload);

            console.log(response.data);
            setToken(response.data.token);
            callback('Login gelukt');

        } catch (error) {
            //console.log(error);
            callback('Login mislukt, controleer uw gegevens');
        }
    }

    function logout() {
        setUser(null);
        setToken(null);
    }

    async function verifyToken(route, callback) {

        try {
            await api.get(route, {
                headers: { 'Authorization': 'Bearer ' + token }
            });

            callback(true);
        } catch (error) {
            //console.log(error);
            callback(false);
        }
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, verifyToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}