import React from 'react';
import styled, { colors, fontSizes, media } from "../styles";
import { Link } from "react-router-dom";
import { css } from "styled-components";

const gridMixin = css`
    grid-column: ${props => props.gridColumn || "1/-1"};
    padding: 0;
`
const iconMixin = css`
    &:hover{
        cursor: pointer;
        border: 1px solid ${colors.primary.dark};
    }
    input{
        font-family: monospace;
    }
`
const selectableMixin = css`
    &:hover{
        cursor: pointer;
        color: ${colors.secondary.light};
        background-color: ${colors.primary.dark};
    }
`
const tableMixin = css`
    white-space: nowrap;
    font-size: ${fontSizes.xsm};
    line-height: ${fontSizes.xsm}
    padding: 2px;
    margin: 0 0 3px;
    text-overflow: ellipsis;
    overflow: hidden;
    border: 1px solid ${colors.secondary.light};
    background-color: ${colors.secondary.light};
    color: ${props => props.completed ? colors.tertiary.light : colors.tertiary.dark};
`

const StyledP = styled.p.attrs({
    color: props => props.err && colors.tertiary.dark,
})`
    font-size: ${fontSizes.sm};
    font-family: Platelet;
    padding: 8px;
    color: ${props => props.color || colors.primary.dark};
    grid-area: ${props => props.gridArea || "auto"};
    text-align: center;
    ${props => props.grid && gridMixin};
    ${props => props.table && tableMixin};
    ${props => props.hasIcon && iconMixin};
    ${props => props.selectable && selectableMixin};
`

export const DisguisedLink = StyledP.extend`
    text-decoration: underline;
`


function P({ children, ...props }) {
    return (
        <StyledP {...props}>
            {children}
        </StyledP>
    )
}

export default P;