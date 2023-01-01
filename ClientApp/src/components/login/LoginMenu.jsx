import React from "react";
import { NavLink, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

export function LoginMenu() {
    return (
        <>
            <NavItem className='NavItem'>
                <NavLink tag={Link} className="text-light bg-dark" to='/registreer'>Registreer</NavLink>
            </NavItem>

            <NavItem className='NavItem'>
                <NavLink tag={Link} className="text-light bg-dark" to='/login'>Login</NavLink>
            </NavItem>
        </>
    );
}