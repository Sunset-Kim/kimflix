import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
font-size: 0.9rem;
margin: 5px;
width: 100%;
`;

const PosterLink = styled(Link)`
display:block;
`
const Image = styled.div`
background-image: url("https://image.tmdb.org/t/p/w300${props => props.bgUrl}");
background-size: cover;
background-position: center center;
width: 100%;
padding-top: 150%;
transition: opacity 300ms ease-in-out;
`

const Title = styled.h4`
display: block;
font-size: 1rem;
font-weight: bold;
margin-bottom: 0.3rem;
`;



const Person = ({ data }) => {
  return (
    <PosterLink to={`/person/${data.id}`} >
      <Container>
        <Image bgUrl={data.profile_path} />
        <Title>
          {data.name}
        </Title>
      </Container>
    </PosterLink >
  )
};

export default Person;