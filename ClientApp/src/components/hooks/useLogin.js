import { useAuthContext } from "./useAuthContext";
import { useState } from "react";


export function useLogin() {
    const [response, setResponse] = useState();
    const { user, dispatch, api } = useAuthContext();

    async function login(username, password) {

        const resp = await api.post('/api/login', {
            username: username,
            password: password
        });

        if (resp.status == 200) {
            console.log(resp.data);
            console.log(resp.status);
            console.log(resp.statusText);
            console.log(resp.header);
            console.log(resp.config);
            setResponse('login gelukt');

            dispatch({
                type: 'SET_USER',
                payload: resp.data.userName 
            });
            
            localStorage.setItem('user', resp.data.token);
        }
        else {
            setResponse('login mislukt, controleer uw gegevens');
        }

    }


    return { login, response };
}