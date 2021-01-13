import React, { Component } from "react";
import SettingsService from 'services/settings-service'

export default class Settings extends Component {
    settingsService = new SettingsService();

    constructor(props) {
        super(props);
        this.state = {
            showOwnPostsInFeed: props.user.settings.showOwnPostsInFeed
        }
    }


    handleInputChange = (e) => {
        if (e.target.className === "showOwnPostsInFeed") {
            if (!this.state.showOwnPostsInFeed)
                this.setState({ showOwnPostsInFeed: true })
            else
                this.setState({ showOwnPostsInFeed: false })
        }
    }

    saveChanges = async (e) => {
        this.props.user.settings.showOwnPostsInFeed = !this.props.user.settings.showOwnPostsInFeed
        this.props.handleSettingsChange({ showOwnPostsInFeed: this.state.showOwnPostsInFeed });
        await this.settingsService.saveSettings(this.props.user)
            .then(() => this.props.history.push("/feed"));
    }

    render() {
        //var renderedOutput = this.state.posts.map(post => <div key={props.post.id}>{post.body}, published by {post.postedByFirstName} {post.postedByLastName}</div>)
        return (
            <div>
                <div style={{ marginTop: "auto" }}>
                    <input className="showOwnPostsInFeed" id="showOwnPostsInFeed" value={this.props.user.settings.showOwnPostsInFeed} checked={this.state.showOwnPostsInFeed} onChange={this.handleInputChange} type="checkbox" />
                    <span className="showOwnPostsInFeed" onClick={this.handleInputChange}>Show your own posts in feed?</span>
                </div>
                <br></br>
                <div>
                    <button id="save" onClick={this.saveChanges}>Save Settings</button>
                </div>
            </div>
        );
    }
}