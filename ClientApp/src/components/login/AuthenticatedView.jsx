import React from "react";


export function AuthenticatedView(userName, profilePath, logoutPath, logoutState) {
    return (<Fragment>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
      </NavItem>
      <NavItem>
        <NavLink replace tag={Link} className="text-dark" to={logoutPath} state={logoutState}>Logout</NavLink>
      </NavItem>
    </Fragment>
    );
  }