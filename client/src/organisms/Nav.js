import React, { Fragment } from 'react';
import styled from "../styles";

//components
import Search from "../molecules/Search";
import Menu from "./Menu";
import { Toggler } from "atom-lib";
import Icon from "../atoms/Icon";
import Panel from "./Panel";
import NavLink from "../atoms/NavLink";
import A from "../atoms/A";
import P from "../atoms/P";

//state
import { connect } from "riddl-js";
import { logout } from "../riddl/auth";

//navigation
import {withRouter} from "react-router-dom";

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: nav;
`

function Nav({ children, logout, history, ...props }) {
    return (
        <StyledNav {...props}>
            <P onClick={()=> history.goBack()}selectable>Back</P>
            <Search />
            <Menu>
                <Toggler render={({ toggled, toggle }) => (
                    <Fragment>
                        <Icon onClick={toggle} />
                        <Panel menu toggled={toggled}>
                            <NavLink to="/home" onClick={toggle}>Home</NavLink>
                            <A onClick={logout}>Logout</A>
                        </Panel>
                    </Fragment>
                )}></Toggler>
            </Menu>
        </StyledNav>
    )
}

export default withRouter(connect(Nav, null, { logout }));
