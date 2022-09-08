import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {},
        };
        this.roomCode = this.props.match.params.roomCode;
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getRoomDetails();
        this.getCurrentSong();
    }



    componentDidMount() {
        this.interval = setInterval(this.getCurrentSong, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }


    getRoomDetails() {
        return fetch("/api/get-room" + "?code=" + this.roomCode)
            .then((response) => {
                if (!response.ok) {
                    // this.props.leaveRoomCallback();
                    this.leaveButtonPressed()
                    this.props.history.push("/")
                    // console.log("get-room 404 response", response.status)
                }
                return response.json();
            })
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
                if (this.state.isHost) {
                    this.authenticateSpotify();
                }
            });
    }

    authenticateSpotify() {
        fetch('/spotify/is-authenticated', { method: 'GET' }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            this.setState({ spotifyAuthenticated: data.status })
            console.log("authenticated status:" + data.status)
            if (data.status) {
            } else {
                fetch('/spotify/get-auth-url').then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {

                    }
                }).then((data) => {
                    console.log("auth-url: " + data.url)
                    console.log(window.location)
                    window.location.replace(data.url);
                });
            }
        });
    }

    leaveButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((response) => {
            console.log(response.status)
            // this.props.leaveRoomCallback();
            this.props.history.push("/");
        });
    }

    renderSettingsButton() {
        return (
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.updateShowSettings(true)}
                >
                    Settings
                </Button>
            </Grid>
        );
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value,
        });
    }

    renderSettings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage
                        update={true}
                        votesToSkip={this.state.votesToSkip}
                        guestCanPause={this.state.guestCanPause}
                        roomCode={this.roomCode}
                        updateCallback={this.getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.updateShowSettings(false)}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    }

    getCurrentSong() {
        fetch("/spotify/current-song")
            .then((response) => {
                if (!response.ok) {
                    return { "nope": "nope" };
                } else {
                    console.log(response)
                    console.log("getCurrentSong::response.status:" + response.status)
                    return response?.json();
                }
            })
            .then((data) => {
                this.setState({ song: data });
                // console.log(data);
            });
    }


    render() {
        if (this.state.showSettings) {
            return this.renderSettings();
        }
        return (
            <>
                <h6>Code: {this.roomCode}
                    Votes: {this.state.votesToSkip}
                    ||Guest Can Pause: {this.state.guestCanPause.toString()}
                    ||Host: {this.state.isHost.toString()}
                    ||spotify-authorized:{this.state.spotifyAuthenticated.toString()}</h6>
                <MusicPlayer {...this.state.song} />
                <h1></h1>
                <Grid container alignItems="center" spacing={1}>
                    {this.state.isHost ? this.renderSettingsButton() : null}

                    <Grid item xs={12} align="center">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.leaveButtonPressed}
                        >
                            Leave Room
                        </Button>
                    </Grid>
                </Grid>
            </>
        );
    }
}
