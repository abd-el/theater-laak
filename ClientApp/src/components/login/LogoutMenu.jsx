import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { NavLink, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import './NBdropdown.css';


export function LogoutMenu() {
    const logout = useLogout();
    const { authState } = useAuthContext();
    let message;


    authState == null ? (message = '') : (message = authState.user.voornaam)



    return (
        <div>
            <NavItem>
            <div class="dropdown">
                <button class="dropdown-btn text-light bg-dark" id="dropdown-content-link" tabIndex={0}>👤 {message}</button>
                <div class="dropdown-content" aria-labelledby="dropdown-content-link">
                    <a href="/mijn-tickets">🎟️ Mijn tickets</a>
                    <a href="/accountinstellingen">⚙️ Instellingen</a>
                    <a href="" onClick={logout}>🚪 Log uit</a>
                </div>
            </div>
            </NavItem>
            {/* <NavItem>
                <NavLink tag={Link} className="text-light bg-dark" to=''>👤 {message}</NavLink>
            </NavItem>

            <NavItem>
                <NavLink tag={Link} onClick={logout} className="text-light bg-dark" to='' >Log uit</NavLink>
            </NavItem> */}
        </div>
    );
}
