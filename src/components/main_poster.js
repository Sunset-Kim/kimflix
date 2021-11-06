import React from 'react';
import styled from "styled-components";
import Proptype from "prop-types";
import { Link } from "react-router-dom"


const PosterLink = styled(Link)`
display: block;
width: 100%;
height: 100%;
`
const Container = styled.div`
position: relative;
width: 100%;
padding-top: 150%;
`;

const Image = styled.div`
position: absolute;
top: 0;
left: 0;
background-image: url("https://image.tmdb.org/t/p/w500${props => props.bgUrl}");
background-size: cover;
background-repeat: no-repeat;
background-position: center center;
width: 100%;
height: 100%;
border-radius: 10px;

`

const ImageBottom = styled.div`
position: absolute;
top: 80%;
left: 0;
background-image: url("https://image.tmdb.org/t/p/w500${props => props.bgUrl}");
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
width: 100%;
height: 100%;
border-radius: 10px;
mask-image: linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0));
transform: rotate(180deg) rotateX(-70deg) ;
`

const MainPoster = ({ isMovie, movie }) => {
  { console.log(movie) }

  return (
    <PosterLink to={isMovie ? `/movie/${movie.id}` : `/show/${movie.id}`}>
      <Container>
        <Image bgUrl={movie.poster_path} />
        <ImageBottom bgUrl={movie.poster_path} />
      </Container>
    </PosterLink >
  );
}

MainPoster.prototype = {

}

export default MainPoster;