import React, { Component } from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Home from "components/home/home";
import Stuff from "components/stuff/stuff";
import Contact from "components/contact/contact";
import Login from "components/login/login";
import "./index.css";

export default class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>SPA</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/stuff">Stuff</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/stuff" component={Stuff} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}