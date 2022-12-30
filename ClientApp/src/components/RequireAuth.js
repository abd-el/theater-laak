import { useEffect } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useValidation } from "./hooks/useValidation";
import { LoginForm } from "./login/LoginForm";

export function RequireAuth({ children }) {
    const { verifyToken, result } = useValidation();
    const navigate = useNavigate();

    verifyToken();
    console.log(result);

    if (result) {
        return children;
    }
    else {
        return navigate('/login');
    }

}