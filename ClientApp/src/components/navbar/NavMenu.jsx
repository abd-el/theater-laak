import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from '../login/LoginMenu';
import { LogoutMenu } from '../login/LogoutMenu';
import { AuthContext } from '../context/AuthContext';
import './NavMenu.css';
import { NavigatieItem } from './NavigatieItem'
import { ExpirationModal } from '../ExpirationModal';

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  static contextType = AuthContext;


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
      ingelogd: false
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  loginMenu = () => {
    if (!this.state.ingelogd) {
      return <LoginMenu />
    }

    else {
      return <LogoutMenu />
    }
  }


  selecteer = (e) => {
    let url = e.target.href.split(window.location.origin)[1]
    this.setState({
      geselecteerd: this.links[url]
    })
  }

  componentDidUpdate() {
      const { authState } = this.context;

      if (authState != null && this.state.ingelogd == false)
        this.setState({ ingelogd: true });

      if (authState == null && this.state.ingelogd == true)
        this.setState({ ingelogd: false });
  }


  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-dark bg-dark navbar-toggleable-sm ng-white box-shadow mb-3" container light>
          <NavbarBrand onClick={this.selecteer} tag={Link} to="/">theater laak</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow opacity-75">

              <NavigatieItem onClick={this.selecteer} geselecteerd={"home" == this.state.geselecteerd} text="Home" to="/" />
              <NavigatieItem onClick={this.selecteer} geselecteerd={"doneer" == this.state.geselecteerd} text="Doneer" to="/doneer" />
              <NavigatieItem onClick={this.selecteer} geselecteerd={"programmering" == this.state.geselecteerd} text="Programmering" to="/programmering" />
              <NavigatieItem onClick={this.selecteer} geselecteerd={"artiestenportaal" == this.state.geselecteerd} text="Artiestenportaal" to="/artiestenportaal" hidden={!this.state.artiest} />
              <NavigatieItem onClick={this.selecteer} geselecteerd={"instellingen" == this.state.geselecteerd} text="⚙️" to="/accountinstellingen" hidden={!this.state.ingelogd} />
              <ExpirationModal />
              {this.loginMenu()}

            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
