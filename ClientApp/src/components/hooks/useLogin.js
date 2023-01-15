import { useAuthContext } from "./useAuthContext";
import { backendApi } from "../api";
import { useState } from "react";
import { useEffect } from "react";



export function useLogin() {
    const [message, setMessage] = useState();
    const { dispatch } = useAuthContext();


    async function login(username, password) {
        const resp = await backendApi.post('/api/login', {
            username: username,
            password: password
        });

        if (resp.status == 200) {
            setMessage('login gelukt');

            dispatch({
                type: 'SET_STATE',
                payload: resp.data,
            });
            localStorage.setItem('authState', JSON.stringify(resp.data));

        }
        else if (resp.data == 'locked') {
            setMessage('we hebben gemerkt dat u recentelijk te vaak heeft geprobeerd in te loggen op uw account.'
                + ' Om uw account te beschermen, is het voor 10 minuten geblokkeerd.');
        }
        else {
            setMessage('login mislukt, controleer uw gegevens');
        }

    }

    function logout() {
        dispatch({ type: 'DELETE_STATE' });

        localStorage.clear();
    }


    return { login, logout, message, setMessage };
}