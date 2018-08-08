import React from 'react';
import styled from "../styles";

//components
import Panel from "../organisms/Panel";
import Logo from "../molecules/Logo";
import Image from "../atoms/Image";
import { FormContainer } from "atom-lib";
import FormDisplay from "../molecules/FormDisplay";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import P from "../atoms/P";

//state
import { connect } from "riddl-js";

//transmitters
import { login } from "../riddl/auth";

const Div = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center; 
`;

function Login({ children, match, location, history, err, login, ...props }) {
    return (
        <Div {...props}>
            <Panel>
                <Logo>
                    <Image />
                </Logo>
                <FormContainer
                    reset
                    inputs={{ username: "", password: "" }}
                    submit={({ inputs }) => login(inputs).then(() => history.push("/home"))}
                    render={({ inputs, handleChange, handleSubmit }) => (
                        <FormDisplay onSubmit={handleSubmit}>
                            <Label htmlFor="username" >
                                <Input
                                    id="username"
                                    onChange={handleChange}
                                    name="username"
                                    value={inputs.username}
                                    placeholder="@" />
                            </Label>
                            <Label htmlFor="password">
                                <Input
                                    id="password"
                                    onChange={handleChange}
                                    name="password"
                                    value={inputs.password}
                                    type="password"
                                    placeholder="#" />
                            </Label>
                            <Button type="submit">Log In</Button>
                            {err ? <P err>{err}</P> : <P>V School LMS Admin</P>}
                        </FormDisplay>
                    )} />
            </Panel>
        </Div>
    )
}

export default connect(Login, state => state.auth, { login });
