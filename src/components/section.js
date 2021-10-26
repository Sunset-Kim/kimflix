import React from "react";
import PropType from "prop-types";
import styled from "styled-components";

const Container = styled.div``;
const Title = styled.span``;
const Grid = styled.div``;



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