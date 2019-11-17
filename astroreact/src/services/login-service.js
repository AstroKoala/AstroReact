import axios from 'axios';
import User from 'models/user';
import Config from 'config';
import { Cookies } from 'react-cookie';
import $ from 'jquery';

export default class LoginService {
    cookie = new Cookies();

    // get ip addr of connected client. will send this along with login request
    async ipLookUp() {
        return $.ajax('http://ip-api.com/json')
            .then(response => {
                //this.cookie.set('location', response.query);
                return response.query;
                ////console.log('setting ' + response.query)
                //this.setState({ ipAddr: response.query });
            })
            .catch(err => console.log(err));
    }

    createUser(data) {
        let user = new User();
        user.id = data.id;
        user.lastName = data.last_name;
        user.firstName = data.first_name;
        user.email = data.email;
        user.age = data.age;
        user.verified = data.verified;
        user.username = data.user_name;
        user.ipAddress = data.ipAddress;
        console.log(user)
        return user;
    }

    handleError(err) {
        console.log(err);
    }

    //returns a user
    async login(email, password, ipAddr) {
        return await axios.get(Config.apiUrl + '/login', {
            crossdomain: true,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                ip: ipAddr,
                email: email,
                pass: password
            }
        }).then(res => {
            return this.createUser(res.data)
        }).catch(err => {
            console.log(err);
        });
    }

    async register(email, password, username) {
        return await axios.get(Config.apiUrl + '/register', {
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                email: email,
                pass: password,
                username: username
            }
        }).then(res => {
            console.log('User created success')
            console.log(res)
        }).catch(err => {
            console.log(err);
        });
    }

    //just save cookie, only return success/fail
    async storeCookie(userId, ipAddr) {
        await axios.get(Config.apiUrl + '/store_cookie', {
            crossdomain: true,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                id: userId,
                ip: ipAddr
            }
        }).then(res => {
            return res;
        }).catch(err => {
            console.log(err);
        });
    }

    //returns a user
    async checkCookie(ipAddr) {
        return await axios.get(Config.apiUrl + '/check_cookie', {
            crossdomain: true,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                ip: ipAddr
            }
        }).then(res => {
            console.log(this.createUser(res.data))
            return this.createUser(res.data)
        }).catch(err => {
            console.log(err);
        });
    }


    async deleteCookie() {
        return await axios.get(Config.apiUrl + '/delete_cookie', {
            crossdomain: true,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        });
    }

}

