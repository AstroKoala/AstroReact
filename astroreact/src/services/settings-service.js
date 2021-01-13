import axios from 'axios';
import Config from 'config';

export default class SettingsService {
    url = Config.apiUrl + "/settings"

    handleError(err) {
        console.log(err);
    }

    async saveSettings(user) {
        return await axios.get(this.url + '/save_settings', {
            crossdomain: true,
            headers: { 'Content-Type': 'application/json' },
            params: {
                uid: user.id,
                settings: user.settings.showOwnPostsInFeed
            }
        }).then(res => {
            return res;
        }).catch(err => {
            return err;
        });
    }

    //TODO: implement
    async getSettings() {
        return await axios.get(this.url + '/get_posts_from_friends', {
            crossdomain: true,
            headers: { 'Content-Type': 'application/json' },
            params: {}
        }).then(res => {
            return res;
        }).catch(err => { this.handleError(err) });
    }
}