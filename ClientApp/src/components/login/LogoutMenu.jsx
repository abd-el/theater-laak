import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { NavLink, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";


export function LogoutMenu() {
    const logout = useLogout();
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
