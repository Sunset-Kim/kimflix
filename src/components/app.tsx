import React from "react";
import Router from "components/router";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "style/GlobalStyle";
import { Theme } from "style/Theme";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
