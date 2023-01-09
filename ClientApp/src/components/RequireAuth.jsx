import { useEffect } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useValidation } from "./hooks/useValidation";
import jwtDecode from "jwt-decode";
import { LoginForm } from "./login/LoginForm";

export function RequireAuth({ children, AllowedRoles }) {
    const { validateToken, validated } = useValidation();
    const { authState } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        async function test() {
            await validateToken();
        }
        test();
    }, [validated]);

    function isRoleAllowed() {
        if (authState != null) {
            const decoded_jwt = jwtDecode(authState.token);
            const role = decoded_jwt
            ['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            return AllowedRoles.includes(role) ? true : false;
        }
        return false;
    }

    if (validated && isRoleAllowed()) {
        return children;
    }
    else if (validated == false) {
        navigate('/login');
    }
    else {
        return (
            <div style={{ position: "absolute", top: "100px" }}>
                <p color="white">
                    403 FORBIDDEN <br />
                    <br />
                    U heeft geen toegang tot deze resource. <br />
                    Dit kan komen doordat u niet over de juiste autorisatie beschikt of omdat de toegang tot deze resource is beperkt. <br />
                    Als u denkt dat dit een fout is, neem dan contact op met onze klantenservice via [link naar contactformulier]. <br />
                    Wij helpen u graag verder.
                </p>
            </div>
        );
    }
}