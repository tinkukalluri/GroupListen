import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import Info from "./Info"
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
    }


    renderHomePage() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
                        </Button>
                        <Button color="default" to="/info" component={Link}>
                            Info
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }



    render() {
        return (
            <Router className="IN_home_router">
                <Switch>
                    <Route exact path="/info" component={Info} />
                    <Route
                        exact
                        path="/"
                        component={this.renderHomePage}
                    />
                    <Route
                        path="/join"
                        render={(props) => {
                            return <RoomJoinPage {...props} />
                        }} />
                    <Route path="/create"
                        render={
                            (props) => {
                                return (<CreateRoomPage {...props} />)
                            }
                        } />
                    <Route
                        path="/room/:roomCode"
                        render={(props) => {
                            return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
                        }}
                    />
                </Switch>
            </Router>
        );
    }
}
