import { useContext, useEffect } from "react";
import { useState } from "react";
import { backendApi } from "../api";
import { useLogin } from "./useLogin";


export function useValidation(){
    const [validated, setValidated] = useState();
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
    },[validated]);

    async function validateToken(){
        
        let storage = JSON.parse(localStorage.getItem('authState'));

        if(storage == null){
            storage = '';
        }


        const resp = await backendApi.get('/api/login/validateToken', {
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