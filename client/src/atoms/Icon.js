import React from 'react';
import styled, { colors, fontSizes } from "../styles";

const StyledIcon = styled.span`
    color: ${colors.primary.dark};
    font-size: ${fontSizes.md};
    padding: 3px;
    margin: 3px;
    &:hover{
        cursor: pointer;
        color: ${colors.secondary.light};
        background-color: ${colors.primary.dark};
    }
`

function Icon(props) {
    return (
        <StyledIcon {...props}>&#9776;</StyledIcon>
    )
}

export default Icon
