import Settings from 'models/settings';
export default class User {
    id = 0;
    age = 0;
    lastName = "";
    firstName = "";
    email = "";
    pass = "";
    verified = false;
    username = "";
    ipAddress = "";
    settings = new Settings(null);

    constructor(object) {
        if (object) {
            this.id = object.id;
            this.lastName = object.last_name;
            this.firstName = object.first_name;
            this.email = object.email;
            this.age = object.age;
            this.verified = object.verified;
            this.username = object.user_name;
            this.settings = object.settings;
        }
    }

    buildUserFromData(id, lastName, firstName, email, age, verified, userName, ipAddress, settings) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.age = age;
        this.verified = verified;
        this.userName = userName;
        this.ipAddress = ipAddress;
        this.settings = settings;
    }
}
