import React from 'react';
// import ReactDOM from 'react-dom';
// import User from 'models/user';
import LoginService from 'services/login-service'
import swal from 'sweetalert';
import './login.css';

export default class Login extends React.Component {
    loginService = new LoginService();

    constructor(props) {
        super(props);
        if (props.id)
            props.history.push("/");
        this.state = {
            email: "email",
            password: "password",
        };
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
            await this.loginService.login(this.state.email, this.state.password)
                .then(res => {
                    if (res.id > 0) {
                        this.props.handleuser(res);
                        this.props.history.push("/");
                        this.loginService.storeCookie(res.id, this.state.email)
                    } else {
                        this.setState({
                            email: "",
                            password: ""
                        })
                        //TODO: separate incorrect vs internal err
                        swal({
                            title: "Login Failed",
                            text: "Incorrect email and/or password.",
                            icon: "error",
                            timer: 2200,
                            button: false
                        })
                    }
                })
                .catch(err => {
                    swal({
                        title: "Uh-Oh",
                        text: "Internal error, please try again in a little bit.",
                        icon: "error",
                        timer: 2200,
                        button: false
                    })
                })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleEmailChange} />
                <br></br>
                <input handleuser={this.handler} type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
                <br></br>
                <button type="submit">Login</button>
            </form>
        );
    }

}