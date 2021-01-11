export default class Post {
    id = 0;
    userId = 0;
    body = "";
    likes = 0;
    comments = 0;
    datePosted = null;

    constructor(object) {
        if (object) {
            this.id = object.id;
            this.lastName = object.userId;
            this.firstName = object.body;
            this.email = object.likes;
            this.age = object.comments;
            this.verified = object.datePosted;
        }
    }

    buildPostFromData(id, userId, body, likes, comments, datePosted) {
        this.id = id;
        this.userId = userId;
        this.body = body;
        this.likes = likes;
        this.comments = comments;
        this.datePosted = datePosted;
    }
}

