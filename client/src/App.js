import React, { Component } from 'react';

//libraries
import { Switch, Route, Redirect } from "react-router-dom";

//ORGANISMS
import Modal from "./organisms/Modal";

//PAGES
import Login from "./pages/Login";
import Home, { Div } from "./pages/Home";
import StudentPage from "./pages/Student";

//CONTAINERS

//STATE
import { connect } from "riddl-js";

//TRANSMITERS
import { login, logout, authenticate } from "./riddl/auth";
import { getSubmissions } from "./riddl/submissions";

class App extends Component {
    componentDidMount() {
        this.props.authenticate().then(() => this.props.getSubmissions());
    }
    render() {
        const { auth, submissions } = this.props;
        return (
            auth.loading ?
                <Modal>
                    Loading User
                </Modal>
                :
                <Switch>
                    <Route exact path="/" render={props => (
                        auth.isAuthenticated ?
                            <Redirect to="/home" /> :
                            <Login {...props} />
                    )} />
                    <Route path="/home" render={props => (
                        auth.isAuthenticated ?
                            <Home {...props} /> :
                            <Redirect to="/" />
                    )} />
                    <Route path="/students/:id" render={({ match: { params: { id } } }) => (
                        auth.isAuthenticated ?
                            <StudentPage {...submissions.data.find(sub => sub._id === id)}>test</StudentPage> :
                            <Redirect to="/" />
                    )} />
                </Switch>
        )
    }
}

export default connect(App, null, { login, logout, authenticate, getSubmissions });
