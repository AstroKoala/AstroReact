import React, { Component } from "react";

export default class Stuff extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     id: this.props.id,
    //     //     firstName: this.props.firstName,
    //     // };
    // }

    render() {
        return (
            <div>
                <h2>STUFF</h2>
                <p>Mauris sem velit, vehicula eget sodales vitae, rhoncus eget sapien:</p>
                <ol>
                    <li>Nulla pulvinar diam</li>
                    <li>Facilisis bibendum</li>
                    <li>Vestibulum vulputate</li>
                    <li>Eget erat</li>
                    <li>Id porttitor</li>
                </ol>
            </div>
        );
    }
}