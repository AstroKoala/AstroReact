export default class Post {
    id = 0;
    userId = 0;
    body = "";
    likes = 0;
    comments = 0;
    datePosted = null;
    postedByFirstName = "";
    postedByLastName = "";

    constructor(object) {
        if (object) {
            this.id = object.id;
            this.userId = object.userId;
            this.body = object.body;
            this.likes = object.likes;
            this.comments = object.comments;
            this.datePosted = object.datePosted;
            this.postedByFirstName = object.postedByFirstName;
            this.postedByLastName = object.postedByLastName;
        }
    }

    buildPostFromData(id, userId, body, likes, comments, datePosted, postedByFirstName, postedByLastName) {
        this.id = id;
        this.userId = userId;
        this.body = body;
        this.likes = likes;
        this.comments = comments;
        this.datePosted = datePosted;
        this.postedByFirstName = postedByFirstName;
        this.postedByLastName = postedByLastName;
    }
}

