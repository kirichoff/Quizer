import React, {Component} from 'react';
import './menu.css'
import {Link} from 'react-router-dom'
class Menu extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <input type="checkbox" id="menu-toggle"/>
                <label id="trigger" htmlFor="menu-toggle"></label>
                <label id="burger" htmlFor="menu-toggle"></label>
                <ul id="menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">About</Link></li>
                    <li><Link to="/">Portfolio</Link></li>
                    <li><Link to="/">Contact</Link></li>
                </ul>
            </div>
        );
    }
}

export default Menu;