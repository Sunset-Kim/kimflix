import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";


const globalStyle = createGlobalStyle`
  ${reset};

  a{
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    background: rgba(20, 20, 20, 1);
    color: #fff;
    padding-top: 60px;
  }

`;

export default globalStyle;

