import { useContext, useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useLogin } from "./useLogin";


export function useValidation(){
    const [validated, setValidated] = useState();
    const { api } = useAuthContext();
    const { logout } = useLogin();

    useEffect(()=>{
        const storage = localStorage.getItem('validated');
        if(storage == null){
            setValidated(true);
            return
        }
        setValidated(storage);
    }, []);

    useEffect(()=>{
        localStorage.setItem('validated', validated);
        console.log('useEffect');
    },[validated]);

    async function validateToken(){
        
        let storage = JSON.parse(localStorage.getItem('state'));

        if(storage == null){
            storage = '';
        }


        const resp = await api.get('/api/validateToken', {
            headers: { 'Authorization' : 'Bearer ' + storage.token}
        });
        
        
        if(resp.status == 200){
            setValidated(true);
        }
        
        else{
            logout();
            setValidated(false);
        }
        
        
    }

    return {validateToken, validated}
}