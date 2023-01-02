import React from "react";


export function AnonymousView(registerPath, loginPath) {
    return (<Fragment>
      <NavItem className='NavItem'>
        <NavLink tag={Link} className="text-light bg-dark" to={registerPath}>Register</NavLink>
      </NavItem>
      <NavItem className='NavItem'>
        <NavLink tag={Link} className="text-light bg-dark" to={loginPath}>Login</NavLink>
      </NavItem>
    </Fragment>);
  }