import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  ${(props) => props.theme.button?.size.padding}
  ${(props) => props.theme.button?.style.primary}

  > * {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: inherit;
  }
`;

export const LinkButton: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};
