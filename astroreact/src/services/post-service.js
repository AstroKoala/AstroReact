import axios from 'axios';
import Config from 'config';

export default class PostService {
    url = Config.apiUrl + "/posts"

    handleError(err) {
        console.log(err);
    }

    async getPostsFromFriends(userId, showOwnPostsInFeed) {
        return await axios.get(this.url + '/get_posts_from_friends', {
            crossdomain: true,
            headers: { 'Content-Type': 'application/json' },
            params: {
                id: userId,
                showSelf: showOwnPostsInFeed
            }
        }).then(res => {
            return res.data;
        }).catch(err => {
            return err;
        });
    }
}

