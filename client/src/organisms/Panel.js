import React from 'react';
import styled, {colors} from "../styles";
import {css} from "styled-components";

const menuMixin = css`
    bottom: auto;
    display: ${props => props.toggled ? "flex" : "none"}
    position: absolute;
    width: auto;
    background-color: ${colors.secondary.light};
    box-shadow: 3px 3px 3px ${colors.primary.dark};
    right: 8px;
    transform: translateY(3px);
`

const Div = styled.div`
    display: flex;
    width: 65%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 15%;
    ${props => props.menu && menuMixin}
`

function Panel({children, ...props}) {
    return (
        <Div {...props}>
            {children}
        </Div>
    )
}

export default Panel;
