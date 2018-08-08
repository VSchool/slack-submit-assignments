import React from 'react';
import styled, {colors, fontSizes} from "../styles";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
    color: ${colors.secondary.mid};
    font-family: Platelet;
    font-size: ${fontSizes.md};
    height: 100%;
    width: 100%;
    padding: 6px;
    &:hover{
        cursor: pointer;
        color: ${colors.secondary.light};
        background-color: ${colors.primary.dark};
    }
`

function NavLink({ children, ...props }) {
    return (
        <StyledLink {...props}>
            {children}
        </StyledLink>
    )
}

export default NavLink;