import React from 'react';
import styled, {colors,fontSizes} from "../styles";

const StyledH1 = styled.h1`
    text-align: center;
    color: ${colors.primary.dark};
    font-size: ${fontSizes.xlg};
    font-family: LtPro;
    font-weight: 100;
    padding: 8px 0 0;
    grid-area: hdr;
`

function H1({children, ...props}) {
    return (
        <StyledH1 {...props}>
            {children}
        </StyledH1>
    )
}

export default H1;
