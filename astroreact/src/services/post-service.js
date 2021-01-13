import axios from 'axios';
import Config from 'config';

export default class PostService {
    url = Config.apiUrl + "/posts"

    handleError(err) {
        console.log(err);
    }

    async getPostsFromFriends(id, bool) {
        return await axios.get(this.url + '/get_posts_from_friends', {
            crossdomain: true,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                uid: id,
                showSelf: bool
            }
        }).then(res => {
            return res.data;
        }).catch(err => {
            this.handleError(err)
        });
    }
}

