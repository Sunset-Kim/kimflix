import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropType from "prop-types";

const Container = styled.div`
font-size: 0.9rem;
margin: 5px;
width: 200px;
`;

const PosterLink = styled(Link)`
  display:block;
`

const Image = styled.div`
background-image: url("https://image.tmdb.org/t/p/w300${props => props.bgUrl}");
background-size: cover;
background-position: center center;
width: 200px;
height: 300px;
transition: opacity 300ms ease-in-out;
`

const Title = styled.h4`
display: block;
font-size: 1rem;
font-weight: bold;
margin-bottom: 0.3rem;
`;

const Year = styled.span`
display: block;
font-size: 0.9rem;
color: rgba(255, 255, 255, 0.5);
`;


const SlidePoster = ({ data, isMovie = false }) => (
  <PosterLink to={isMovie ? `/movie/${data.id}` : `/show/${data.id}`}>
    <Container>
      <Image bgUrl={data.poster_path ? data.poster_path : null} />
      <Title>{data.length > 12 ? data.title.substr(0, 12) + '...' : data.title}</Title>
      <Year>{data.year}</Year>
    </Container>
  </PosterLink >
);

SlidePoster.prototype = {

}

export default SlidePoster;