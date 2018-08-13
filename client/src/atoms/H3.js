import React from 'react';
import styled, { colors, fontSizes } from "../styles";

export const StyledH3 = styled.h3`
    text-align: center;
    color: ${colors.primary.dark};
    font-size: ${fontSizes.sm};
    font-family: LtPro;
    grid-area: ${props => props.gridArea || "auto"};
`

function H3({ children, ...props }) {
    return (
        <StyledH3 {...props}>
            {children}
        </StyledH3>
    )
}

export default H3;
