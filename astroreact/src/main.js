import React from 'react';
import { Route, NavLink, BrowserRouter, Redirect, Switch } from "react-router-dom";
// import { Navbar, Button } from 'react-bootstrap';
import { CookiesProvider, Cookies } from 'react-cookie';
import LoginService from 'services/login-service'
import Home from "components/home/home";
import Stuff from "components/stuff/stuff";
import Contact from "components/contact/contact";
import Feed from "components/feed/feed";
import Login from "components/login/login";
import Settings from "components/settings/settings";
import Register from 'components/register/register';
import PassReset from 'components/pass-reset/pass-reset';
import Verification from './components/verification/verification';
import User from 'models/user';

import "./index.css";


export default class Main extends React.Component {
    loginService = new LoginService();
    cookie = new Cookies();

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this);
        this.handleSettingsChange = this.handler.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            user: new User(null)
        };
        this.checkLoggedIn()
    }

    async checkLoggedIn() {
        if (!this.cookie.get('key'))
            return new User(null);
        else
            return this.loginService.checkCookie(this.cookie.get('key'))
                .then(res => {
                    this.state.user = res
                    this.forceUpdate()
                });
    }



    //This method will be sent to the child component
    handler(e) {
        this.setState({ ...this.state, ...e });
    }

    handleSettingsChange(e) {
        this.setState({ ...this.state.user.settings, ...e });
    }

    rememberPage(e) {
        //implement cookie to store current page
    }

    render() {
        return (
            <CookiesProvider>
                <BrowserRouter>
                    <div>
                        {this.state.user.id > 0
                            ? <ul className="header">
                                <li className="nav-left"><NavLink exact to="/">Home</NavLink></li>
                                <li className="nav-left"><NavLink exact to="/feed">Custom Feed</NavLink></li>
                                <li className="nav-left"><NavLink exact to="/stuff">Stuff</NavLink></li>
                                <li className="nav-left"><NavLink exact to="/contact">Contact</NavLink></li>
                                <li onClick={this.handleLogout} className="nav-right"><NavLink to="/login">Logout</NavLink></li>
                                <li className="nav-right"><NavLink exact to="/settings">Settings</NavLink></li>
                            </ul>
                            : <ul className="header">
                                <li className="nav-left"><NavLink to="/login">Login</NavLink></li>
                                <li className="nav-left"><NavLink to="/register">Register</NavLink></li>
                            </ul>
                        }
                        {this.state.user.id > 0
                            ? < div className="content">
                                <Switch>
                                    <Route exact path='/'
                                        render={(props) => <Home {...props} user={this.state.user} />} />
                                    <Route path='/stuff'
                                        render={(props) => <Stuff {...props} user={this.state.user} />} />
                                    <Route path='/contact'
                                        render={(props) => <Contact {...props} user={this.state.user} />} />
                                    <Route path='/feed'
                                        render={(props) => <Feed {...props} user={this.state.user} />} />
                                    <Route path='/settings'
                                        render={(props) => <Settings {...props} user={this.state.user} handler={this.handler} handleSettingsChange={this.handleSettingsChange} />} />
                                    <Route render={() => <Redirect to={{ pathname: "/" }} />} />
                                </Switch>
                            </div>
                            : < div className="content">
                                <Switch>
                                    <Route path='/verification' render={(props) => <Verification {...props} user={this.state.user} handleuser={this.handler} />} />
                                    <Route path='/register' render={(props) => <Register {...props} user={this.state.user} handleuser={this.handler} />} />
                                    <Route path='/pass-reset' render={(props) => <PassReset {...props} user={this.state.user} handleuser={this.handler} />} />
                                    <Route path='/login' render={(props) => <Login {...props} user={this.state.user} handleuser={this.handler} />} />
                                    <Route render={() => <Redirect to={{ pathname: "/login" }} />} />
                                </Switch>
                            </div>
                        }
                    </div>
                </BrowserRouter>
            </CookiesProvider >
        );
    }

    async handleLogout() {
        return await this.loginService.deleteCookie(this.cookie.get('key'))
            .then(() => {
                this.setState({
                    loggedIn: false,
                    user: new User(null),
                });
            })
            .catch(err => {
                throw err;
            });
    }

    handleShowOwnPostsInFeed = async (boolean) => {
        this.setState({ showOwnPostsInFeed: boolean })
        this.cookie.remove("showOwnPostsInFeed", { path: "/" });
        this.cookie.set("showOwnPostsInFeed", boolean, { path: "/" });
    }
}
