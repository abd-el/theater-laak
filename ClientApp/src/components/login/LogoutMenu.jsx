import React from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { NavLink, NavItem } from "reactstrap";
import { Link } from "react-router-dom";


export function LogoutMenu() {
    const { logout } = useLogin();
    const { authState } = useAuthContext();
    
    let message;
    authState == null ? (message = '') : (message = authState.user.voornaam)

    return (
        <>
            <NavItem>
                <NavLink tag={Link} className="text-light bg-dark" to=''>Hallo {message}</NavLink>
            </NavItem>

            <NavItem>
                <NavLink tag={Link} onClick={logout} className="text-light bg-dark" to='' >Loguit</NavLink>
            </NavItem>
        </>
    );
}
