import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropType from "prop-types";

const Container = styled.div`
font-size: 0.9rem;
margin: 5px;
width: 100%;
`;

const PosterLink = styled(Link)`
  display:block;
`

const Image = styled.div`
background-image: url(${props => props.bgUrl});
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
margin-top: 0.5rem;
`;

const Year = styled.span`
display: block;
font-size: 0.9rem;
color: rgba(255, 255, 255, 0.5);
`;


const SlidePoster = ({ data, isMovie = false, link = true }) => (
  link ? (
    <PosterLink to={isMovie ? `/movie/${data.id}` : `/show/${data.id}`}>
      <Container>
        <Image bgUrl={data.poster_path ? `https://image.tmdb.org/t/p/w300${data.poster_path}` : require('../assets/notfound.jpeg').default} />
        <Title>
          {isMovie ?
            (data.title.length > 16 ? data.title.substr(0, 16) + '...' : data.title) :
            (data.name.length > 16 ? data.name.substr(0, 16) + '...' : data.name)
          }
        </Title>
        <Year>{data.year}</Year>
      </Container>
    </PosterLink >) : (

    <Container>
      <Image bgUrl={data.poster_path ? data.poster_path : null} />
      <Title>
        {isMovie ?
          (data.title.length > 16 ? data.title.substr(0, 16) + '...' : data.title) :
          (data.name.length > 16 ? data.name.substr(0, 16) + '...' : data.name)
        }
      </Title>
      <Year>{data.year}</Year>
    </Container>

  )
);

SlidePoster.prototype = {

}

export default SlidePoster;