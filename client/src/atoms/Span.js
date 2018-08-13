import React from 'react';
import styled, {colors} from "../styles";

const StyledSpan = styled.span`
    font-family: monospace;
    font-weight: 100;
    background-color: ${colors.secondary.light}; 
`

function Span({children, ...props}) {
    return (
        <StyledSpan {...props}>
            {children}
        </StyledSpan>
    )
}

export default Span
