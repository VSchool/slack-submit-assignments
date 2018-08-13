import React from 'react'
import styled,{colors, fontSizes} from "../styles";

const Div = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: ${colors.secondary.light};
    color: ${colors.primary.dark};
    opacity: .8;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Platelet;
    font-size: ${fontSizes.xlg};
`

function Modal({ children, ...props }) {
    return (
        <Div {...props}>
            {children}
        </Div>
    )
}

export default Modal
