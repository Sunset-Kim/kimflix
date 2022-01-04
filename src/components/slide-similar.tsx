import React from "react";
import { Link } from "react-router-dom";
import { IMovie, ITV } from "services/api";
import styled from "styled-components";
import { createImgPath } from "Utils/imgpath";

const Container = styled(Link)`
  position: relative;
  display: block;
  width: 150px;

  img {
    width: 100%;
    pointer-events: none;
  }
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;

  h3 {
    font-size: 16px;
    line-height: 1.5em;
  }

  span {
    font-size: 14px;
    line-height: 1.2em;
  }
`;

interface SlideSimilarProps {
  data: IMovie | ITV;
}
const SlideSimilar: React.FC<SlideSimilarProps> = ({ data }) => {
  const isMovie = "title" in data ? true : false;

  return (
    <Container
      to={isMovie ? `/movie/detail/${data.id}` : `/tv/detail/${data.id}`}
    >
      <img
        src={createImgPath(data.poster_path, false)}
        alt={isMovie ? (data as IMovie).title : (data as ITV).name}
      />
      <Info>
        <h3>{isMovie ? (data as IMovie).title : (data as ITV).name}</h3>
        <span>
          {isMovie
            ? (data as IMovie).release_date
            : (data as ITV).first_air_date}
        </span>
        <span>{isMovie ? (data as IMovie).title : (data as ITV).name}</span>
      </Info>
    </Container>
  );
};

export default SlideSimilar;
