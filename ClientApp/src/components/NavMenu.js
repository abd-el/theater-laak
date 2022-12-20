import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
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
              <NavItem className='NavItem'>
                <NavLink tag={Link} className="text-light nav-item bg-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem className='NavItem'>
                <NavLink tag={Link} className="text-light bg-dark" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem className='NavItem'>
                <NavLink tag={Link} className="text-light bg-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
              <NavItem className='NavItem'>
                <NavLink tag={Link} className="text-light bg-dark" to="/doneer">Doneer</NavLink>
              </NavItem>
              <NavItem className='NavItem'>
                <NavLink tag={Link} className="text-light bg-dark" to="/programmering">Programmering</NavLink>
              </NavItem>
              <LoginMenu>
              </LoginMenu>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
