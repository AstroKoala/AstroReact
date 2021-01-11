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
import User from 'models/user';
import Verification from './components/verification/verification';
import "./index.css";


export default class Main extends React.Component {
    loginService = new LoginService();
    cookie = new Cookies();

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        // Set some state
        this.state = {
            loggedIn: this.checkLoggedIn(),
            id: this.cookie.get('id'),
            email: '',
            pass: '',
            username: this.cookie.get('user_name'),
            verified: this.cookie.get('verified'),
            showOwnPostsInFeed: (this.cookie.get('showOwnPostsInFeed') === "false") ? false : true,
        };
    }

    async checkLoggedIn() {
        if (!this.cookie.get('key'))
            return false;
        if (this.cookie.get('id'))
            return true;
        return await this.loginService.checkCookie().then(res => {
            this.setTempCookies(res);
        });
    }


    //This method will be sent to the child component
    handler(e) {
        this.setState({ ...this.state, ...e });
    }

    render() {
        return (
            <CookiesProvider>
                <BrowserRouter>
                    <div>
                        <h1>SPA</h1>
                        {this.state.id
                            ? <ul className="header">
                                <li className="nav-left"><NavLink exact to="/">Home</NavLink></li>
                                <li className="nav-left"><NavLink exact to="/feed">Custom Feed</NavLink></li>
                                <li className="nav-left"><NavLink exact to="/stuff">Stuff</NavLink></li>
                                <li className="nav-left"><NavLink exact to="/contact">Contact</NavLink></li>
                                <li onClick={this.handleLogout} className="nav-right"><NavLink to="/login">Logout</NavLink></li>
                                <li className="nav-right"><NavLink exact to="/settings">Settings</NavLink></li>
                            </ul>
                            : <ul className="header">
                                {/* <li><NavLink to="/login">Home</NavLink></li>  */}
                                {/* <li><NavLink exact to="/login">Contact</NavLink></li> */}
                                <li className="nav-left"><NavLink to="/login">Login</NavLink></li>
                                <li className="nav-left"><NavLink to="/register">Register</NavLink></li>
                            </ul>
                        }
                        {this.state.id
                            ? < div className="content">
                                <Switch>
                                    <Route exact path='/'
                                        render={(props) => <Home {...props} id={this.state.id} email={this.state.email} username={this.state.username} verified={this.state.verified} />} />
                                    <Route path='/stuff'
                                        render={(props) => <Stuff {...props} id={this.state.id} username={this.state.username} />} />
                                    <Route path='/contact'
                                        render={(props) => <Contact {...props} id={this.state.id} username={this.state.username} />} />
                                    <Route path='/feed'
                                        render={(props) => <Feed {...props} id={this.state.id} showOwnPostsInFeed={this.state.showOwnPostsInFeed} handleShowOwnPostsInFeed={this.handleShowOwnPostsInFeed} />} />
                                    <Route path='/settings'
                                        render={(props) => <Settings {...props} id={this.state.id} showOwnPostsInFeed={this.state.showOwnPostsInFeed} handleShowOwnPostsInFeed={this.handleShowOwnPostsInFeed} />} />
                                    <Route render={() => <Redirect to={{ pathname: "/" }} />} />
                                </Switch>
                            </div>
                            : < div className="content">
                                <Switch>
                                    {/* <Route path='/verification' render={(props) => <Verification {...props} handleuser={this.handler} />} /> */}
                                    <Route path='/verification' render={(props) => <Verification {...props} handleuser={this.handler} />} />
                                    <Route path='/register' render={(props) => <Register {...props} handleuser={this.handler} />} />
                                    <Route path='/pass-reset' render={(props) => <PassReset {...props} handleuser={this.handler} />} />
                                    <Route path='/login' render={(props) => <Login {...props} handleuser={this.handler} />} />
                                    <Route render={() => <Redirect to={{ pathname: "/login" }} />} />
                                </Switch>
                            </div>
                        }
                    </div>
                </BrowserRouter>
            </CookiesProvider >
        );
    }

    /* COOKIE FUNCTIONS */
    setSingleUserCookie(userAttribute) { }

    // will overwrite cookies if necessary, no big deal
    setTempCookies(user) {
        this.cookie.remove('logged', { path: "/" });
        this.cookie.remove('id', { path: "/" });
        this.cookie.remove('user_name', { path: "/" });
        this.cookie.remove("verified", user.verified, { path: '/' });
        this.cookie.remove('showOwnPostsInFeed', { path: '/' });
        if (!user || !user.id)
            return;
        this.setState({
            id: user.id,
            loggedIn: true,
            username: user.username,
            verified: user.verified,
            showOwnPostsInFeed: user.showOwnPostsInFeed,
        });
        this.cookie.set('logged', true, { path: '/' });
        this.cookie.set("id", user.id, { path: '/' });
        this.cookie.set("user_name", user.username, { path: '/' });
        this.cookie.set("verified", user.verified, { path: '/' });
        this.cookie.set("verified", user.showOwnPostsInFeed, { path: '/' });
    }

    async handleLogout() {
        return await this.loginService.deleteCookie()
            .then(res => {
                this.setState({
                    id: '',
                    loggedIn: false,
                    username: ''
                });
                this.cookie.remove('key', { path: "/" });
                this.setTempCookies(new User(null));
            });
    }

    handleShowOwnPostsInFeed = async (boolean) => {
        this.setState({ showOwnPostsInFeed: boolean })
        this.cookie.remove("showOwnPostsInFeed", { path: "/" });
        this.cookie.set("showOwnPostsInFeed", boolean, { path: "/" });
    }
}
