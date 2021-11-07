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

const Year = styled.span`
display: block;
font-size: 0.9rem;
color: rgba(255, 255, 255, 0.5);
`;


const Poster = ({ data }) => {
  const [isMovie, setIsMovie] = useState(false);

  useEffect(() => {
    if (data) {
      data.media_type === "movie" ? setIsMovie(true) : setIsMovie(false)
    }
  }, [])

  return (
    <PosterLink to={isMovie ? `/movie/${data.id}` : `/show/${data.id}`}>
      <Container>
        <Image bgUrl={data.poster_path ? data.poster_path : null} />
        <Title>
          {
            isMovie ? data.title : data.name
          }
        </Title>
        <Year>{isMovie ? data.release_date : data.first_air_date}</Year>
      </Container>
    </PosterLink >
  )
};

export default Poster;