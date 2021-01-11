import React, { Component } from "react";
import PostService from 'services/post-service'
import Post from 'models/post';


export default class Contact extends Component {
    PostService = new PostService();
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     id: this.props.id,
    //     //     firstName: this.props.firstName,
    //     // };
    // }

    constructor(props) {
        super(props);
        this.state = {
            id: props.id
        }
    }

    render() {
        return (
            <div>
                <h2>GOT QUESTIONS?</h2>
                <p>The easiest thing to do is post on
                our <a href="http://localhost:3000/home">forums</a>.
                </p>

                <button onClick={this.doThing}>CLICK ME</button>
            </div>
        );
    }

    doThing = async (e) => {
        e.preventDefault()
        await this.PostService.getPostsFromUser(this.state.id)
            .then(res => res.forEach(item => {
                let post = new Post(item);
                console.log(post)
            }));
    }
}