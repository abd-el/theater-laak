import { useAuthContext } from "./useAuthContext";
import { api } from "../api";
import { useState } from "react";


export function useLogin() {
    const [response, setResponse] = useState();
    const { dispatch } = useAuthContext();

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
                type: 'SET_STATE',
                payload: resp.data
            });
            localStorage.setItem('authState', JSON.stringify(resp.data));
            
        }
        else {
            setResponse('login mislukt, controleer uw gegevens');
        }

    }

    function logout(){
        dispatch({type: 'DELETE_STATE'});
        localStorage.clear();
    }


    return { login, logout, response };
}