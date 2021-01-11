import axios from 'axios';
import Config from 'config';

export default class SettingsService {
    url = Config.apiUrl + "/settings"

    handleError(err) {
        console.log(err);
    }

    //TODO: implement
    async saveSettings() {
        return await axios.get(this.url + '/get_posts_from_friends', {
            crossdomain: true,
            headers: { 'Content-Type': 'application/json' },
            params: {}
        }).then(res => {
            return res.data;
        }).catch(err => { this.handleError(err) });
    }

    //TODO: implement
    async getSettings() {
        return await axios.get(this.url + '/get_posts_from_friends', {
            crossdomain: true,
            headers: { 'Content-Type': 'application/json' },
            params: {}
        }).then(res => {
            return res.data;
        }).catch(err => { this.handleError(err) });
    }
}