import React from 'react';
import styled, { colors } from "../styles";
import { css } from "styled-components";
import { StyledInput } from "./Input";

const flexMixin = css`
    margin: 0;
    padding: 0;
    font-size: 1em;
    flex: 1;
    margin: 0 1px;
    padding: 1px;
`

export const Button = styled(StyledInput.withComponent("button"))`
    font-family: Platelet;
    margin: 8px;
    width: auto;
    ${props => props.flex && flexMixin};
    &:hover{
        cursor: pointer;
        background-color: ${colors.primary.dark};
        color: ${colors.secondary.light};
    }
`

function Submit({ children, ...props }) {
    return (
        <Button {...props}>
            {children}
        </Button>
    )
}

export default Submit
