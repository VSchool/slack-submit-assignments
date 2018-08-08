import React from 'react';
import styled, { colors, fontSizes } from "../styles";
import {css} from "styled-components";

const placeholderMixin = css`
    transform: translateX(36px) rotate(45deg) ;
    transform-origin: 0 0;
    margin: 0;
    padding: 0;
`

export const StyledInput = styled.input`
    display: inline;
    width: 100%;
    color: ${colors.primary.dark};
    background-color: ${colors.secondary.light};
    font-size: ${fontSizes.md};
    font-family: LtPro;
    margin: 3px;
    border: none;
    text-align: center;
    box-shadow: 3px 3px 3px ${colors.primary.dark};
    &::placeholder{
        font-size: ${fontSizes.sm};
        margin: 3px;
        font-family: LtPro;
        padding-left: 18px;
        text-align: left;
        opacity: .8;
        ${props => props.search && placeholderMixin}
    }
    &:hover{
        cursor: auto;
    }
`

function Input(props) {
    return (
        <StyledInput {...props} />
    )
}

export default Input;
