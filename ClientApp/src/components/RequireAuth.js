import { useEffect } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useValidation } from "./hooks/useValidation";
import { LoginForm } from "./login/LoginForm";

export function RequireAuth({ children }) {
    const { validateToken, validated } = useValidation();
    const navigate = useNavigate();
    
    useEffect(()=>{
        async function test(){
            await validateToken();
        }
        test();
    }, []);


        
    if (validated) {
        return children;
    }
    else {
        navigate('/login');
    }

}