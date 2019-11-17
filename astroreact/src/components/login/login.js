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
                .catch(res => {
                    this.setState({
                        email: "",
                        password: ""
                    })
                    swal({
                        title: "Uh-Oh",
                        text: "Incorrect email and/or password.",
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
                {/* <input type='text' onChange={this.props.ourInputFunction()}></input> */}
                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                <br></br>
                <input handleuser={this.handler} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                <br></br>
                <button type="submit">Login</button>
            </form>
        );
    }

    // async AlertDismissibleExample() {
    //     const [show, setShow] = React.useState(true);

    //     if (show) {
    //         return (
    //             <Alert variant="danger" onClose={() => setShow(false)} dismissible>
    //                 <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
    //                 <p>
    //                     Change this and that and try again. Duis mollis, est non commodo
    //                     luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
    //                     Cras mattis consectetur purus sit amet fermentum.
    //         </p>
    //             </Alert>
    //         );
    //     }
    //     return <Button onClick={() => setShow(true)}>Show Alert</Button>;
    // }

}
//this.props.handleuser(usr);