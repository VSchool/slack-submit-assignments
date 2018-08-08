import React from 'react';
import styled from "../styles";
import {css} from "styled-components";

const flexMixin = css`
    display: flex;
    margin: 0 0 24px;
`
const gridMixin = css`
    grid-area: menu;
`

const Div = styled.div`
    position: relative;
    ${props => props.flex && flexMixin}
    ${props => props.grid && gridMixin}
`

function Menu({ children, ...props }) {
    return (
        <Div {...props}>
            {children}
        </Div>
    )
}

export default Menu;
