import React from "react";
import PropType from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
`;
const Title = styled.h2`
font-size: 1.4rem;
margin-bottom: 1rem;
`;
const Grid = styled.div`
display: flex;
flex-wrap: wrap;
`;

const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);


Section.prototype = {
  title: PropType.string,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node,
  ])

}

export default Section;