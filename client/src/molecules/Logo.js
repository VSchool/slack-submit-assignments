import React from 'react';
import styled, { colors } from "../styles";

const Div = styled.div`
    height: 10em;
    width: 10em;
    border: 3px solid ${colors.primary.dark};
    border-radius: 50%;
    background-color: ${colors.secondary.light};
    box-shadow: 3px 3px 1px ${colors.primary.dark};
`

function Logo({ children, ...props }) {
    return (
        <Div {...props}>
            {children}
        </Div>
    )
}

export default Logo;
