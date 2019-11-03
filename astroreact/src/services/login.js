import axios from 'axios';

export default class LoginService {
    url = 'http://localhost:8080/api'

    async login(email, password) {
        const response = await axios.get(this.url + '/login',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params:
                {
                    email: email,
                    pass: password
                }
            }
        )
        console.log(response.data)
        return response.data
    }
}