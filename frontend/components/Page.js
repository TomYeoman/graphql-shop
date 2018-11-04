import React, { Component } from "react";
import Header from "./Header";
// We can do theming etc within here
import styled, { ThemeProvider, injectGlobal } from "styled-components";

const commonTheme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${commonTheme.black};
  }
  button {  font-family: 'radnika_next'; }
`;

const lightTheme = {
  ...commonTheme,
  background: "#fff"
};

const darkTheme = {
  ...commonTheme,
  background: "#000"
};

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
`;

const StyledPage = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.textColor};
`;

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <StyledPage>
          {/* Nav / Search etc */}
          <Header />
          {/* Product */}
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}
