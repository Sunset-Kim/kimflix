import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  @font-face {
    font-family: 'GmarketSans';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff') font-weight-normal;
    font-weight: normal;
    font-style: normal;
  }


  html,body,#root {
    height: 100%;
    
  }
  
  body {
    overflow-x: hidden;
  }

  a{
    text-decoration: none;
    color: inherit;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'GmarketSans';
    letter-spacing: 0.02em;
    font-size: 14px;
    background: ${({ theme }) => theme.color.background.default};
    color: #fff;
  }

  button {
    border: none;
    outline: none;
  }

  input {
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
