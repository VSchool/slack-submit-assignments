import React, { Component, Fragment } from 'react';

//libraries
import { Switch, Route, Redirect } from "react-router-dom";

//ATOMS
import Image from "./atoms/Image";
import Label from "./atoms/Label";
import Input from "./atoms/Input";
import Button from "./atoms/Button";
import P from "./atoms/P";
import A from "./atoms/A";
import H1 from "./atoms/H1";
import H3 from "./atoms/H3";
import Select from "./atoms/Select";
import NavLink from "./atoms/NavLink";
import Icon from "./atoms/Icon";

//MOLECULES
import Logo from "./molecules/Logo";
import FormDisplay from "./molecules/FormDisplay";

//ORGANISMS
import Panel from "./organisms/Panel";
import Nav from "./organisms/Nav";
import Menu from "./organisms/Menu";
import Modal from "./organisms/Modal";

//PAGES
import Login from "./pages/Login";
import Home, { Div } from "./pages/Home";
import StudentPage from "./pages/Student";

//CONTAINERS
import { FormContainer, Toggler } from "atom-lib";
import Clipboard from "./containers/Clipboard";

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
