import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        this.relativePath = window.location.pathname
        this.roomCode = this.relativePath.split("/")[2]
        console.log(this.props.location)
        this.getRoomDetails();
        console.log(this.roomCode)
    }

    getRoomDetails() {
        fetch("/api/get-room" + "?code=" + this.roomCode)
            .then((response) => response.json())
            .then((data) => {
                console.log("json Response", data)
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            });
    }

    render() {
        return (
            <div>
                <h3>{this.roomCode}</h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
            </div>
        );
    }
}
