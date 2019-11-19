import React, { Component } from "react";

export default class Home extends Component {
    constructor(props) {
        super(props);
        if (!props.id)
            props.history.push("/login");
    }

    render() {
        return (
            <div>
                <h2>HELLO</h2>
                <p>Cras facilisis urna ornare ex volutpat, et
                convallis erat elementum. Ut aliquam, ipsum vitae
                gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                metus nec massa. Maecenas hendrerit laoreet augue
                nec molestie. Cum sociis natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus.</p>

                <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>

                {this.props.id ? <p> Hello there, ({this.props.id}) {this.props.username}</p> : <p>not logged in</p>}
            </div>
        );
    }
}