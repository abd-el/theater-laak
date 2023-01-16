import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { backendApi } from "../api";
import { useNavigate } from "react-router-dom";



export function useEmailConfirmation() {
    const { dispatch } = useAuthContext();
    const { navigate } = useNavigate();
    const [message, setMessage] = useState();

    async function confirmToken(token, username, instellingenOpen, isPwReset) {
        const resp = await backendApi.post('/api/login/validateEmail', {
            token: token,
            userName: username
        });

        if (resp.status == 200 && isPwReset) {
            return resp.data;
        }
        else if (isPwReset) {
            return null;
        }

        if (resp.status == 200) {
            setMessage("login gelukt");
            dispatch({
                type: 'SET_STATE',
                payload: resp.data,
            });
            localStorage.setItem('authState', JSON.stringify(resp.data));

            if (!instellingenOpen) {
                //komt nog
                return
            }
        }
        else {
            setMessage('login mislukt');
            return true;
        }
    }

    async function sendTokenToEmail(username) {
        const resp = await backendApi.post('/api/login/sendEmail', {
            userName: username
        });
        if (resp.status == 200) {
            return true;
        }
        else {
            return false;
        }
    }

    return {
        confirmToken: confirmToken,
        sendTokenToEmail: sendTokenToEmail,
        message: message,
        setMessage: setMessage
    }
}