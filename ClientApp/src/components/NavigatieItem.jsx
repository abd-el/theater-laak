import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './NavMenu.css';
import { Link } from 'react-router-dom';

export class NavigatieItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geselecteerd: false
        }
    }

    componentDidUpdate(){
        if(window.location.path == this.props.to){
            this.setState({
                geselecteerd: true
            })
        }
    }

    render(){
        return (
            <NavItem className={`${this.props.hidden ? "d-none" : ""} NavItem`}>
                <NavLink 
                    tag={Link}
                    className={`text-light nav-item rounded-2 ${this.state.geselecteerd ? `bg-black` : `bg-dark`}`}
                    to={this.props.to}>
                        {this.props.text}
                </NavLink>
            </NavItem>
        )
    }
}