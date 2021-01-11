import React, { Component } from "react";
import SettingsService from 'services/settings-service'

export default class Settings extends Component {
    SettingsService = new SettingsService();

    constructor(props) {
        super(props);
        if (props.id === 0) {
            props.history.push("/login");
        }
        this.state = {
            id: props.id,
            showOwnPostsInFeed: props.showOwnPostsInFeed
        }
        console.log(this.state.showOwnPostsInFeed)
    }


    handleInputChange = (e) => {
        if (e.target.className === "showOwnPostsInFeed") {
            var elem = document.getElementById("showOwnPostsInFeed");
            elem.checked = !elem.checked

            //this.props.handleShowOwnPostsInFeed(e.target.checked);
            // if (e.target.checked === false) {
            //     var arr = this.state.posts;
            //     for (var i = arr.length - 1; i >= 0; --i)
            //         if (Number(arr[i].userId) === Number(this.state.id))
            //             arr.splice(i, 1);
            //     this.forceUpdate()
        } else {
            console.log(e.target)
        }
    }

    render() {
        //var renderedOutput = this.state.posts.map(post => <div key={post.id}>{post.body}, published by {post.postedByFirstName} {post.postedByLastName}</div>)
        return (
            <div>
                <div onClick={this.handleInputChange}>
                    <input className="showOwnPostsInFeed" id="showOwnPostsInFeed" type="checkbox" onChange={this.handleInputChange} />
                    <span className="showOwnPostsInFeed">Show your own posts in feed?</span>
                </div>
                <div>
                    <button id="save" onClick={this.handleInputChange}>Save Settings</button>
                </div>
            </div>
        );
    }
}