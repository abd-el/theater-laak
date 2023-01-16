import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export function useAuthContext(){
    const _AuthContext = useContext(AuthContext);

    if(_AuthContext == null){
        throw Error('AuthContext may only be used inside AuthContextProvider');
    }

    return _AuthContext;
}