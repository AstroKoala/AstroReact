import React from 'react';
// import ReactDOM from 'react-dom';
// import User from 'models/user';
import LoginService from 'services/login-service'
import './register.css';

export default class Register extends React.Component {
    loginService = new LoginService();

    constructor(props) {
        super(props);
        if (props.id)
            props.history.push("/");
        this.state = {
            email: "",
            password: "",
            username: "",
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
        console.log('pass: ' + this.state.password)
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handleRegister = async (e) => {
        e.preventDefault()
        if (this.state.email === '' || this.state.password === '' || this.state.username === '') {
            console.log('Bad email/pass/user')
        } else {
            await this.loginService.register(this.state.email, this.state.password, this.state.username)
                .then(async res => {
                    console.log('succeed')
                    this.props.history.push("/login");
                })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleRegister}>
                {/* <input type='text' onChange={this.props.ourInputFunction()}></input> */}
                <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleEmailChange} />
                <br></br>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
                <br></br>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} />
                <br></br>

                <button type="submit">Register</button>
            </form>
        );
    }
}

//this.props.handleuser(usr);