import React from "react";
import PropType from "prop-types";
import styled from "styled-components";


const Container = styled.div`
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
`;

const Text = styled.span`
color: ${props => props.color || 'gray'};
font-size: 2rem;
`;

const message = ({ text, color }) => (
  <Container>
    <Text color={color}>
      <span>{text}</span>
    </Text>
  </Container>
)

message.prototype = {
  text: PropType.string.isRequired,
}

export default message;