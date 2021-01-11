import React, { Component } from "react";

export default class Contact extends Component {

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
            </div>
        );
    }
}