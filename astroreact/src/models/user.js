export default class User {
    id;
    age;
    lastName;
    firstName;
    email;
    pass;
    verified;

    User(
        id,
        lastName,
        firstName,
        email,
        pass,
        age,
        verified
    ) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.pass = pass;
        this.age = age;
        this.verified = verified;
    }
}
