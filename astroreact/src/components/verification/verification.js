import React from 'react';
import LoginService from 'services/login-service'
import swal from 'sweetalert';

export default class verification extends React.Component {
    loginService = new LoginService();
    constructor(props) {
        super(props);
        if (!window.location.href.includes("?verification=")) {
            props.history.push("/login");
        }
        this.state = {
            verified: this.props.verified,
            email: "",
            password: "",
        }
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleVerify = async (e) => {
        e.preventDefault()
        if (this.state.email !== '' && this.state.password !== '') {
            await this.loginService.login(this.state.email, this.state.password)
                .then(async res => {
                    var user = res
                    if (user.id > 0) {
                        // unique notice, then redirec
                        let str = window.location.href;
                        let code = str.substring(str.lastIndexOf('=') + 1); //everything AFTER the '='
                        await this.loginService.verifyEmail(this.state.email, code)
                            .then((res) => {
                                swal("Verified", "Thank you for verifying! You should be redirected in just a sec.", "success", { buttons: false, timer: 2200 })
                                    .then(() => {
                                        user = res; // should just overwrite "verified" variable with T or F
                                        this.props.handleuser(user);
                                        this.props.history.push("/");
                                        this.loginService.storeCookie(user.id, this.state.email)
                                    })
                            })
                            .catch(err => {
                                if (err.response.data === "Invalid Link") {
                                    console.log(err.response.status + ": " + err.response.data)
                                    swal(
                                        "Verification Expired!",
                                        "Sorry, that verification link is expired. Please check your email for the most recent link, or click the button below to get a new one.",
                                        "warning",
                                        {
                                            //position: 'top-end',
                                            buttons: {
                                                resend: {
                                                    text: 'Re-Send',
                                                    value: "resend"
                                                },
                                                cancel: "Cancel"
                                            }
                                        })
                                        .then(async (value) => {
                                            if (value === "resend") {
                                                swal("Sent!", "Our email should be with you shortly!", "success", { buttons: false, timer: 2500 })
                                                console.log(this.state.email)
                                                await this.loginService.sendVerification(this.state.email).then(() => { this.props.history.push("/") });
                                            }
                                        })
                                } else if (err.response.data === "Already Verified") {
                                    console.log("NOOOOOPE")
                                }
                            })
                    } else {
                        this.setState({
                            //email: "",
                            password: ""
                        })
                        this.showGenericNotice("Login Failed", "Incorrect email and/or password.", "error")
                    }
                })
                .catch(err => {
                    this.showGenericNotice("Uh-Oh", "Internal error, please try again in a little bit.", "error")
                })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleVerify}>
                <input type="text" name="email" value={this.state.email} placeholder="email" onChange={this.handleEmailChange} />
                <br></br>
                <input handleuser={this.handler} type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handlePasswordChange} />
                <br></br>
                <button type="submit">Verify Email</button>
            </form>
        );
    }

    // async showVerificationNotice() {
    //     swal({
    //         title: "Email Not Verified",
    //         text: "Please verify your email before logging in.",
    //         icon: "warning",
    //         buttons: {
    //             //send mail again
    //             resend: {
    //                 text: "Re-send verification email",
    //                 value: "resend",
    //             },
    //             cancel: "Confirm",
    //         },
    //     }).then(async (value) => {
    //         if (value === "resend") {
    //             swal("Gotcha!", "Our email should be with you shortly!", "success", { buttons: false, timer: 2500 })
    //             await this.loginService.sendVerification(this.state.email).then(res => console.log(res));
    //         }
    //     });
    // }

    async showGenericNotice(title, text, icon) {
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