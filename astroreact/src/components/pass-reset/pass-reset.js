import React from 'react';
import LoginService from 'services/login-service'
import swal from 'sweetalert';
import './pass-reset.css';

export default class PassReset extends React.Component {
    loginService = new LoginService();

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            passConfirm: ""
        };
    }

    render() {
        return (
            <form onSubmit={this.resetPass}>
                <input type="text" name="email" value={this.state.email} placeholder="email" onChange={this.handleEmailChange} />
                <br></br>
                <input handleuser={this.handler} type="password" name="pass" value={this.state.pass} placeholder="password" onChange={this.handlePassChange} />
                <br></br>
                <input handleuser={this.handler} type="password" name="passConfirm" value={this.state.passConfirm} placeholder="confirm password" onChange={this.handlePassConfirmChange} />
                <br></br>
                <button type="submit">Update Password</button>
            </form>
        );
    }

    resetPass = async (e) => {
        e.preventDefault()
        if (this.state.pass === this.state.passConfirm && this.state.email !== "") {
            await this.loginService.resetPass(this.state.email, this.state.pass)
                .then(res => {
                    this.props.handleuser(res);
                    this.loginService.storeCookie(res.id, res.email)
                    this.showAlertNotice("Password Reset Successfully", "No need to log in again, we've taken care of it for you!", "success")
                })
                .catch(err => {
                    this.showAlertNotice("Uh-Oh", "Internal error, please try again in a little bit.", "error")
                })
        }
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePassChange = (e) => {
        this.setState({ pass: e.target.value });
    }

    handlePassConfirmChange = (e) => {
        this.setState({ passConfirm: e.target.value });
    }

    showAlertNotice(title, text, icon) {
        swal({
            title: title,
            text: text,
            icon: icon,
            buttons: false,
            timer: 2500,
            // button: button,
        })
    }
}