import React from 'react';
// import ReactDOM from 'react-dom';
// import User from 'models/user';
import LoginService from 'services/login'
import './login.css';

export default class Login extends React.Component {
    loginService = new LoginService();

    constructor(props) {
        super(props);
        this.state = {
            email: "email",
            password: "password"
        };
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleLogin = (e) => {
        console.log("EMail: " + this.state.email);
        console.log("Password: " + this.state.password);
        e.preventDefault()
        // function button() {
        this.loginService.login(this.state.email, this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                <br></br>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                <br></br>
                <button type="submit">Login</button>
            </form>
        );
    }

}
