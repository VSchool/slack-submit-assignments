import React from 'react';
import styled from "../styles";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    flex: .8;
`

function FormDisplay({children, ...props}) {
    return (
        <Form {...props}>
            {children}
        </Form>
    )
}

export default FormDisplay;
