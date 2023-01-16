import React from "react";
import { useAuthContext } from "./useAuthContext";

export function useLogout() {
    const { dispatch } = useAuthContext();

    function logout() {
        dispatch({ type: 'DELETE_STATE' });

        localStorage.clear();
    }

    return logout;
}