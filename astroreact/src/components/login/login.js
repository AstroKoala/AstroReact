import React from 'react';
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
            email: "",
            password: "",
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
        if (this.state.email !== '' || this.state.password !== '') {
            await this.loginService.login(this.state.email, this.state.password)
                .then(res => {
                    if (res.id > 0) {
                        // if user not verified, don't let actually log in
                        if (res.verified === false) {
                            this.showVerificationNotice();
                            return;
                        }
                        this.props.handleuser(res);
                        this.props.history.push("/");
                        this.loginService.storeCookie(res.id, res.email)
                    } else {
                        this.setState({
                            //email: "",
                            password: ""
                        })
                        this.showErrNotice("Login Failed", "Incorrect email and/or password.", "error")
                    }
                })
                .catch(err => {
                    this.showErrNotice("Uh-Oh", "Internal error, please try again in a little bit.", "error")
                })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <input type="text" name="email" value={this.state.email} placeholder="email" onChange={this.handleEmailChange} />
                <br></br>
                <input handleuser={this.handler} type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handlePasswordChange} />
                <br></br>
                <div>
                    <button type="submit">Login</button>
                    <span onClick={this.showPassReset}>Forgot Password?</span>
                </div>
            </form>
        );
    }

    showPassReset = async (e) => {
        e.preventDefault()
        this.props.history.push("/pass-reset");
    }

    async showVerificationNotice() {
        swal({
            title: "Email Not Verified",
            text: "Please verify your email before logging in.",
            icon: "warning",
            buttons: {
                //send mail again
                resend: {
                    text: "Re-send verification email",
                    value: "resend",
                },
                cancel: "Confirm",
            },
        }).then(async (value) => {
            if (value === "resend") {
                swal("Gotcha!", "Our email should be with you shortly!", "success", { buttons: false, timer: 2500 })
                await this.loginService.sendVerification(this.state.email);
            }
        });
    }

    showErrNotice(title, text, icon) {
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