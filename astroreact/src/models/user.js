export default class User {
    id;
    age;
    lastName;
    firstName;
    email;
    pass;
    verified;
    username;
    ipAddress;

    User(
        id,
        lastName,
        firstName,
        email,
        age,
        verified,
        userName,
        ipAddress
    ) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.age = age;
        this.verified = verified;
        this.userName = userName;
        this.ipAddress = ipAddress;
    }
}
