import React from "react";
import PropType from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
font-size: 0.9rem;
margin: 5px;
width: 200px;
`;

const Image = styled.div`
background-image: url("https://image.tmdb.org/t/p/w300${props => props.bgUrl}");
background-size: cover;
background-position: center center;
width: 200px;
height: 300px;
transition: opacity 300ms ease-in-out;
`

const Rating = styled.div`
display: flex;
width: 100%;
padding: 0 10px;

justify-content: space-between;
position: absolute;
bottom: 10px;
left: 0;
opacity: 0;
transition: opacity 300ms ease-in-out;

`;


const ImageContainer = styled.div`
position: relative;
margin-bottom: 0.3rem;
&:hover {
  ${Image} {
    opacity: 0.4;
  }
  ${Rating} {
    opacity: 1;
  }
}
`;


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



const Poster = ({ id, imageUrl, title, year, rating, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image bgUrl={imageUrl} />
        {
          rating ? (
            <Rating>
              <span role="img" aria-label="rating">
                ⭐️
              </span>
              <span>
                {rating}/10
              </span>
            </Rating>) : null
        }
      </ImageContainer>
      <Title>{title.length > 8 ? title.substr(0, 8) + '...' : title}</Title>
      <Year>{year}</Year>
    </Container>
  </Link>

);

Poster.prototype = {
  id: PropType.number,
  imageUrl: PropType.string,
  title: PropType.string.isRequired,
  year: PropType.string,
  rating: PropType.number,
  isMovie: PropType.bool
}
export default Poster;

