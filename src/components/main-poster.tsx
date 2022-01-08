import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { createImgPath } from "Utils/imgpath";

const PosterLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 150%;
`;

const Image = styled.div<{ posterImg: string }>`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("${(props) => createImgPath(props.posterImg, "w300")}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const ImageBottom = styled.div<{ posterImg: string }>`
  position: absolute;
  top: 80%;
  left: 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url("${(props) => createImgPath(props.posterImg, "w300")}");
  width: 100%;
  height: 100%;
  border-radius: 10px;
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
  transform: rotate(180deg) rotateX(-70deg);
`;

interface MainPosterProps {
  isMovie: boolean;
  movie: any;
}

const MainPoster: React.FC<MainPosterProps> = ({ isMovie, movie }) => {
  return (
    <PosterLink
      to={isMovie ? `/movie/detail/${movie.id}` : `/tv/detail/${movie.id}`}
    >
      <Container>
        <Image posterImg={movie.poster_path} />
        <ImageBottom posterImg={movie.poster_path} />
      </Container>
    </PosterLink>
  );
};

export default MainPoster;
