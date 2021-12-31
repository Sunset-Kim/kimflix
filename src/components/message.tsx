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
  color: ${(props) => props.color || "gray"};
  font-size: 2rem;
`;

interface MessageProp {
  text: string;
  color?: string;
}

const Message: React.FC<MessageProp> = ({ text, color }) => (
  <Container>
    <Text color={color}>
      <span>{text}</span>
    </Text>
  </Container>
);

export default Message;
