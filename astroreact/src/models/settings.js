export default class Settings {
    showOwnPostsInFeed = true;

    constructor(object) {
        if (object) {
            this.showOwnPostsInFeed = object.showOwnPostsInFeed;
        }
    }

    buildSettingsFromData(showOwnPostsInFeed) {
        this.showOwnPostsInFeed = showOwnPostsInFeed;
    }
}