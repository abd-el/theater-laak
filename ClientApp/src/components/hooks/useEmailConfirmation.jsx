import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { backendApi } from "../api";
import { useNavigate } from "react-router-dom";



export function useEmailConfirmation() {
    const { dispatch } = useAuthContext();
    const { navigate } = useNavigate();
    const [message, setMessage] = useState();


    //Met deze functie kan je een email confirmation token naar het emailadres van de bijbehorende gebruiker sturen.
    //Dit kan d.m.v. het opgeven van het emailadres van de gebruiker. 
    //Dan wordt in de backend gecontroleerd of het emailadres een bijbehorende acc heeft dat in de Db staat opgeslagen.
    //Als het account bestaat wordt de mail verstuurt.
    //EmailisConfirmed true = kan alleen tokens mailen naar geverifieerde emailadresses.
    //EmailisConfirmed false = kan tokens versturen naar nieuwe/nog niet geverifieerde emailadresses.
    async function sendTokenToEmail(userName, EmailisConfirmed) {
        let resp;

        if (EmailisConfirmed) {
            resp = await backendApi.post('/api/login/mailToConfirmedAddress', {
                userName: userName
            });
        }
        else {
            resp = await backendApi.post('/api/login/mailToUnconfirmedAddress', {
                userName: userName
            });
        }

        if (resp.status == 200) {
            return true;
        }
        else {
            return false;
        }
    }

    //met deze functie wordt een email confirmation token in de backend gevalideerd.
    //wanneer een user de SendTokenToEmail functie triggered wordt er in de backend een token gegenereerd.
    //Deze token wordt in de Db aan de user toegevoegd met een geldigheid van 30 minuten.
    //Een kopie van de token wordt daarna gemailed naar het bijbehorende emailadres van de user.
    //de functie neemt deze token als parameter
    //de functie neemt een userName parameter om de bijbehorende token uit de Db op te halen.
    //en controleerd in de backend of ze overeenkomen en of de token niet verlopen is.
    async function confirmToken(token, userName, EmailIsNotConfirmed, isPwReset) {
        const resp = await backendApi.post('/api/login/isTokenValid', {
            token: token,
            userName: userName
        });

        //is PwReset true dan wordt de gebruiker niet ingelogd.
        //isPwReset wordt gebruikt door de PwResetModal component.
        //Deze component heeft authorisatie nodig om het wachtwoord van de user te resetten.
        //de gegevens die hiervoor nodig zijn zitten in resp.data
        if (resp.status == 200 && isPwReset) {
            return resp.data;
        }
        else if (isPwReset) {
            return null;
        }

        //Is PwReset false, dan wordt de rest van de code uitgevoerd om de user in te loggen.
        if (resp.status == 200) {
            setMessage("login gelukt");
            dispatch({
                type: 'SET_STATE',
                payload: resp.data,
            });
            localStorage.setItem('authState', JSON.stringify(resp.data));

            if (EmailIsNotConfirmed) {
                return true;
            }
        }
        else {
            setMessage('login mislukt');
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