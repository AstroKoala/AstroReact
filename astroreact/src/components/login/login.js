import React from 'react';
// import ReactDOM from 'react-dom';
// import User from 'models/user';
import LoginService from 'services/login-service'
import './login.css';

export default class Login extends React.Component {
    loginService = new LoginService();

    constructor(props) {
        super(props);
        console.log(props)
        if (props.id)
            props.history.push("/");
        this.state = {
            email: "email",
            password: "password",
        };
    }

    UNSAFE_componentWillReceiveProps(e) {
        this.setState({ ...this.state, ...e });
        if (e.id)
            this.props.history.push("/");
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleLogin = async (e) => {
        e.preventDefault()
        if (this.state.email === '' || this.state.password === '') {
            console.log('Bad user/pass')
        } else {
            await this.loginService.login(this.state.email, this.state.password, await this.loginService.ipLookUp())
                .then(async res => {
                    this.props.handleuser(res);
                    this.props.history.push("/");
                    this.loginService.storeCookie(res.id, res.ipAddress)
                })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                {/* <input type='text' onChange={this.props.ourInputFunction()}></input> */}
                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                <br></br>
                <input handleuser={this.handler} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                <br></br>
                <button type="submit">Login</button>
            </form>
        );
    }
}

//this.props.handleuser(usr);