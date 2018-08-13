import React from 'react';
import styled, { colors, fontSizes } from "../styles";

const Label = styled.label`
    width: 100%;
`

function LabelDisplay({ children, ...props }) {
    return (
        <Label {...props}>
            {children}
        </Label>
    )
}

export default LabelDisplay
