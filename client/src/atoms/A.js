import React from 'react';
import styled from "../styles";
import { StyledLink } from "./NavLink";

const StyledA = StyledLink.withComponent("a");

function A({ children, ...props }) {
    return (
        <StyledA {...props}>
            {children}
        </StyledA>
    )
}

export default A;