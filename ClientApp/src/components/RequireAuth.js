import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

export function RequireAuth({ children }) {
    const auth = useAuth();


    const userIsAuthorised = true;
    if (userIsAuthorised) {
        return <Navigate to='/login' />
    }
    else {
        return children
    }


}