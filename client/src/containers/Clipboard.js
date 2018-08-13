import React, { Component } from 'react';
import styled, { media } from "../styles";

const Input = styled.input`
    position: absolute;
    opacity: 0;
    z-index: -100;
    ${media.tabletHoriz`
        opacity: 1;
    `}
`

export default class Clipboard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        if (e.target.tagName !== "P") { this.input.select(); return };
        this.input.select();
        document.execCommand("copy");
        this.input.blur();
        alert("Copied!");
        const section = "https://github.com/";
        window.open("https://codesandbox.io/s/github/" + this.props.url.substring(section.length), "_blank");
    }
    render() {
        const { render, url } = this.props;
        const input = <Input innerRef={ref => this.input = ref} value={url} readOnly />
        return render({ input, handleClick: this.handleClick })
    }
}
