import React, { Component } from "react";
import PostService from 'services/post-service'
import Post from 'models/post';
// import PulseLoader from "react-spinners/PulseLoader";


export default class Feed extends Component {
    PostService = new PostService();

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    async componentDidMount() {
        await this.getPersonalizedFeed().then(() => { })
    }

    render() {
        return (<div>
            {/* {this.state.posts.length === 0 && <div><PulseLoader size={25}></PulseLoader><span></span><br></br><br></br><br></br></div>} */}
            {this.state.posts.map((post) => (
                <div key={post.id}>
                    <div>{post.body} </div>
                    <p>published by {post.postedByFirstName} {post.postedByLastName} on {this.convertToStringMonth(post.datePosted.monthOfYear).abbrev} {post.datePosted.dayOfMonth}, {post.datePosted.year} at {this.convertToTwelveHourTime(post.datePosted.hourOfDay, post.datePosted.minuteOfHour)}</p>
                </div>
            ))}
        </div>);
    }

    getPersonalizedFeed = async () => {
        await this.PostService.getPostsFromFriends(this.props.user.id, this.props.user.settings.showOwnPostsInFeed)
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


    //return string representation of 24-hour clock's hour/minute as 12-hour time, with AM/PM
    convertToTwelveHourTime(hour, minute) {
        let half = "AM" //assume morning unless otherwise
        if (hour / 12 > 1) {
            hour -= 12;
            half = "PM"
        }
        if (String(minute).length === 1) minute = "0" + minute;
        return hour + ":" + minute + " " + half;
    }

    convertToStringMonth(month) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const monthAbbrevs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];
        const obj = {
            name: monthNames[month - 1],
            abbrev: monthAbbrevs[month - 1]
        }
        return obj;
    }
}

