import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import { NavigatieItem } from './NavigatieItem'

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      geselecteerd: 'home'
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-dark bg-dark navbar-toggleable-sm ng-white box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">theater laak</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow opacity-75">
              <NavigatieItem text="Home" to="/" />
              <NavigatieItem text="Counter" to="/counter" />
              <NavigatieItem text="Fetch data" to="/fetch-data" />
              <NavigatieItem text="Doneer" to="/doneer" />
              <NavigatieItem text="Programmering" to="/programmering" />
              <NavigatieItem text="Artiestenportaal" to="/artiestenportaal" hidden={false} />

              <LoginMenu>
              </LoginMenu>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
