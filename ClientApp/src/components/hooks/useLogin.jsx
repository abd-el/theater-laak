import { useAuthContext } from "./useAuthContext";
import { backendApi } from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";



export function useLogin() {
    const [message, setMessage] = useState();
    const [isTweeFactorNodig, setTweeFactorNodig] = useState();
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();


    async function login(username, password) {
        const resp = await backendApi.post('/api/login', {
            username: username,
            password: password
        });


        if (resp.data == '2fa') {
            setMessage('wachten op 2FA...');
            setTweeFactorNodig(true);
        }
        else if (resp.status == 200) {
            setMessage('login gelukt');
            setTweeFactorNodig(false);

            dispatch({
                type: 'SET_STATE',
                payload: resp.data,
            });
            localStorage.setItem('authState', JSON.stringify(resp.data));
            navigate('/');
        }
        else if (resp.data == 'locked') {
            setTweeFactorNodig(false);
            setMessage('we hebben gemerkt dat u recentelijk te vaak heeft geprobeerd in te loggen op uw account.'
                + ' Om uw account te beschermen, is het voor 10 minuten geblokkeerd.');
        }
        else {
            setTweeFactorNodig(false);
            setMessage('login mislukt, controleer uw gegevens');
        }

    }

    return {
        login: login,
        message: message,
        setMessage: setMessage,
        isTweeFactorNodig: isTweeFactorNodig,
        setTweeFactorNodig: setTweeFactorNodig
    }
}
