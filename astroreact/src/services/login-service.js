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
                return response.query;
            })
            .catch(err => { throw err });
    }

    handleError(err) {
        console.log(err);
    }

    //returns a user
    async login(email, password) {
        return await axios.get(Config.apiUrl + '/login', {
            crossdomain: true,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                email: email,
                pass: password
            }
        }).then(res => {
            return new User(res.data)
        }).catch(err => {
            return err;
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
            return res;
        }).catch(err => {
            throw err;
        });
    }

    //just save cookie, only return success/fail
    async storeCookie(userId, userEmail) {
        await axios.get(Config.apiUrl + '/store_cookie', {
            crossdomain: true,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                id: userId,
                email: userEmail
            }
        }).then(res => {
            return res;
        }).catch(err => {
            throw err;
        });
    }

    //returns a user
    async checkCookie() {
        return await axios.get(Config.apiUrl + '/check_cookie', {
            crossdomain: true,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
            }
        }).then(res => {
            return new User(res.data)
        }).catch(err => {
            throw err;
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
            throw err;
        });
    }

    async sendVerification(email) {
        var verification = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        verification = verification.substring(0, 32);
        return await axios.get(Config.apiUrl + '/send_verification_email', {
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                email: email,
                verification: verification
            }
        }).then(res => {
            return res
        }).catch(err => {
            throw err;
        });
    }


    async verifyEmail(email, verification) {
        return await axios.get(Config.apiUrl + '/verify_email', {
            crossdomain: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                email: email,
                verification: verification
            }
        }).then(res => {
            console.log(res)
            // if (res.response.data) // TODO: REMEMBER THIS
            return { verified: true }
        }).catch(err => {
            console.log(err)
            throw err;
        });
    }

    async resetPass(email, pass) {
        return await axios.get(Config.apiUrl + '/reset_pass', {
            crossdomain: true,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                email: email,
                pass: pass,
            }
        }).then(res => {
            return new User(res.data)
        }).catch(err => {
            return err;
        });
    }
}

