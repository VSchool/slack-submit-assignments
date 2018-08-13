import React from 'react';
import styled from "../styles";

const StyledSelect = styled.select`
    grid-area: ${props => props.gridArea};
    width: 100%;
`


function Select({ children, ...props }) {
    return (
        <StyledSelect {...props}>
            {children}
        </StyledSelect>
    )
}

export default Select;
