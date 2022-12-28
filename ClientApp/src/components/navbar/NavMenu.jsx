import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from '../api-authorization/LoginMenu';
import './NavMenu.css';
import { NavigatieItem } from './NavigatieItem'

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.links = {
      "/": "home",
      "/counter": "counter",
      "/login": "login",
      "/doneer": "doneer",
      "/programmering": "programmering",
      "/artiestenportaal": "artiestenportaal",
      "/accountinstellingen": "instellingen"
    }

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,

      geselecteerd: this.links[window.location.pathname] || "home",

      // deze informatie halen we op uit de database
      artiest: true,
      ingelogd: true
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  loginMenu = () => {
    if(!this.state.ingelogd){
      return <LoginMenu />
    }
  }

  selecteer = (e) => {
    let url = e.target.href.split(window.location.origin)[1]
    this.setState({
      geselecteerd: this.links[url]
    })
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-dark bg-dark navbar-toggleable-sm ng-white box-shadow mb-3" container light>
          <NavbarBrand onClick={this.selecteer} tag={Link} to="/">theater laak</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow opacity-75">

              <NavigatieItem onClick={this.selecteer} geselecteerd={"home"==this.state.geselecteerd} text="Home" to="/" />
              <NavigatieItem onClick={this.selecteer} geselecteerd={"counter"==this.state.geselecteerd} text="Counter" to="/counter" />
              <NavigatieItem onClick={this.selecteer} geselecteerd={"login"==this.state.geselecteerd} text="Login" to="/login" />
              <NavigatieItem onClick={this.selecteer} geselecteerd={"doneer"==this.state.geselecteerd} text="Doneer" to="/doneer" />
              <NavigatieItem onClick={this.selecteer} geselecteerd={"programmering"==this.state.geselecteerd} text="Programmering" to="/programmering" />
              <NavigatieItem onClick={this.selecteer} geselecteerd={"artiestenportaal"==this.state.geselecteerd} text="Artiestenportaal" to="/artiestenportaal" hidden={!this.state.artiest} />
              <NavigatieItem onClick={this.selecteer} geselecteerd={"instellingen"==this.state.geselecteerd} text="⚙️" to="/accountinstellingen" hidden={!this.state.ingelogd} />

              {this.loginMenu()}
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
