import { createGlobalStyle } from "styled-components";
import BebasNeue from '../../public/fonts/BebasNeue-Regular.ttf';
export const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: "Bebas Neue";
    src: url(${BebasNeue}) format("ttf");
    font-weight: normal;
    font-style: normal;
  }

*{
margin:0;
padding:0;
box-sizing:border-box;                    
}


  html, body, #root {
    width: 100%;
    height: 100%;
    font-family: "Bebas Neue", sans-serif;
  }
`
