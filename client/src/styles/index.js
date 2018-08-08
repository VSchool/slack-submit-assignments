import styled, { injectGlobal, css } from "styled-components";

// FONTS
import ltPro from "../assets/fonts/LtPro-Condensed/DINNextLTPro-Condensed.woff";
import platelet from "../assets/fonts/Platelet/Platelet.ttf";

export const fontSizes = {
    xsm: "1em",
    sm: "1.15em",
    md: "1.8em",
    lg: "2.5em",
    xlg: "3.375em"
}

// COLORS
export const colors = {
    primary: {
        light: "#EFE9DE",
        dark: "#707070"
    },
    secondary: {
        light: "#FFFFFF",
        mid: "#4271C9",
        dark: "#036e6e"
    },
    tertiary: {
        light: "#28c772", //green
        dark: "#FF0000" //red
    }
}

//GLOBAL STYLES
injectGlobal`
    @font-face{
        font-family: LtPro;
        src: url(${ltPro}) format("woff");
    }
    @font-face{
        font-family: Platelet;
        src: url(${platelet}) format("ttf");
    }
    *{
        box-sizing: border-box;
        margin: 0;
    }
    body #root{
        background-color: ${colors.primary.light} 
        height: 100vh;
    }
    a{
        text-decoration: none;
    }
`

//MEDIA QUERIES
const devices = {
    tablet: 600,
    tabletHoriz: 900,
    desktop: 1200
}

export const media = Object.keys(devices).reduce((obj, device) => {
    obj[device] = (...args) => {
        return css`
            @media (min-width: ${devices[device] / 16}em){
                ${css(...args)}
            }
        `
    }
    return obj;
}, {})

export default styled;

