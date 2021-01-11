import React, { Component } from "react";
import PostService from 'services/post-service'
import Post from 'models/post';


export default class Contact extends Component {
    PostService = new PostService();

    constructor(props) {
        super(props);
        if (props.id === 0) {
            props.history.push("/login");
        }
        this.state = {
            id: props.id,
            inId: 0,
            posts: [],
            showOwnPostsInFeed: props.showOwnPostsInFeed
        }
    }

    UNSAFE_componentWillMount() {
        this.getPersonalizedFeed(this.state.showOwnPostsInFeed)
    }

    handleInIdChange = (e) => {
        this.setState({ inId: e.target.value });
    }

    handleInputChange = (e) => {
        if (e.target.className === "showOwnPostsInFeed")
            if (this.state.showOwnPostsInFeed)
                this.setState({ showOwnPostsInFeed: false });
            else
                this.setState({ showOwnPostsInFeed: true });
        if (this.state.showOwnPostsInFeed) {
            var arr = this.state.posts;
            for (var i = arr.length - 1; i >= 0; --i) {
                if (Number(arr[i].userId) === Number(this.state.id)) {
                    arr.splice(i, 1);
                }
            }
            this.forceUpdate()
        } else {
            this.getPersonalizedFeed(true);
        }

    }

    render() {
        var renderedOutput = this.state.posts.map(post => <div key={post.id}>{post.body}, published by {post.postedByFirstName} {post.postedByLastName}</div>)
        return (
            <div>
                <div style={{ marginTop: "auto" }}>
                    <input className="showOwnPostsInFeed" id="showOwnPostsInFeed" checked={this.state.showOwnPostsInFeed} onChange={this.handleInputChange} type="checkbox" />
                    <span className="showOwnPostsInFeed" onClick={this.handleInputChange}>Show your own posts in feed?</span>
                </div>
                <br></br>
                <div>
                    {renderedOutput}
                </div>

            </div >
        );
    }

    getPersonalizedFeed = async (showOwnPostsInFeed) => {
        await this.PostService.getPostsFromFriends(this.state.id, showOwnPostsInFeed)
            .then(res => res.forEach(item => {
                let post = new Post(item);
                if (this.state.posts.filter(i => i.id === post.id).length === 0) {
                    this.state.posts.push(post)
                }
            }))
            .then(() => {
                this.state.posts.sort((a, b) => { return b.id - a.id });
                this.forceUpdate();
            });
    }
}