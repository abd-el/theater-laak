import { useContext } from "react";
import { api } from "../context/AuthContext";
import { useState } from "react";


export function useValidation(){
    const [result, setResult] = useState();


    async function verifyToken(){
        
        const token = localStorage.getItem('user');

        const resp = await api.get('/api/verifyToken', {
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        
        const bool = resp.status == 200;
        setResult(bool);
        
    }

    return {verifyToken, result}
}