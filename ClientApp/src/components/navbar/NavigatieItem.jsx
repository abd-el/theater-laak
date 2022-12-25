import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import './NavMenu.css';
import { Link } from 'react-router-dom';

export class NavigatieItem extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render(){
        return (
            <NavItem className={`${this.props.hidden ? "d-none" : ""} NavItem`}>
                <NavLink 
                    tag={Link}
                    id={this.props.id}
                    onClick={this.props.onClick}
                    className={`text-light nav-item rounded-2 ${this.props.geselecteerd ? `bg-black` : `bg-dark`}`}
                    to={this.props.to}>
                        {this.props.text}
                </NavLink>
            </NavItem>
        )
    }
}