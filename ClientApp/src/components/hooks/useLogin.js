import { useAuthContext } from "./useAuthContext";
import { backendApi } from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";



export function useLogin() {
    const [message, setMessage] = useState();
    const [_2fa, set2FA] = useState();
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();


    async function login(username, password) {
        const resp = await backendApi.post('/api/login', {
            username: username,
            password: password
        });


        if (resp.data == '2fa') {
            setMessage('wachten op 2FA...');
            set2FA(true);
        }
        else if (resp.status == 200) {
            setMessage('login gelukt');
            set2FA(false);

            dispatch({
                type: 'SET_STATE',
                payload: resp.data,
            });
            localStorage.setItem('authState', JSON.stringify(resp.data));
            navigate('/');
        }
        else if (resp.data == 'locked') {
            set2FA(false);
            setMessage('we hebben gemerkt dat u recentelijk te vaak heeft geprobeerd in te loggen op uw account.'
                + ' Om uw account te beschermen, is het voor 10 minuten geblokkeerd.');
        }
        else {
            set2FA(false);
            setMessage('login mislukt, controleer uw gegevens');
        }

    }

    function logout() {
        dispatch({ type: 'DELETE_STATE' });

        localStorage.clear();
    }

    async function verifyEmailToken(token, username) {
        const resp = await backendApi.post('/api/login/validateEmail', {
            token: token,
            userName: username
        });
        if (resp.status == 200) {
            setMessage("login gelukt");

            dispatch({
                type: 'SET_STATE',
                payload: resp.data,
            });
            localStorage.setItem('authState', JSON.stringify(resp.data));
            navigate('/');
        }
        else {
            setMessage('login mislukt');
            return true;
        }
    }


    return { login, logout, message, setMessage, _2fa, set2FA, verifyEmailToken };
}