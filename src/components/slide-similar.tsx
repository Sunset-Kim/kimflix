import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IMovie, ITV } from "services/api";
import styled from "styled-components";
import { createImgPath } from "Utils/imgpath";

const Container = styled.div`
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
  isDrag: boolean;
}
const SlideSimilar: React.FC<SlideSimilarProps> = ({ data, isDrag }) => {
  const navigate = useNavigate();
  const isMovie = "title" in data ? true : false;

  const onPushDetail = () => {
    if (isDrag) return;
    isMovie
      ? navigate(`/movie/detail/${data.id}`)
      : navigate(`/tv/detail/${data.id}`);
  };
  return (
    <Container onClick={onPushDetail}>
      <img
        src={createImgPath(data.poster_path, false)}
        alt={isMovie ? (data as IMovie).title : (data as ITV).name}
      />
      <Info>
        <h3>
          {isMovie
            ? (data as IMovie).title.length > 8
              ? (data as IMovie).title.substring(0, 8) + "..."
              : (data as IMovie).title
            : (data as ITV).name.length > 8
            ? (data as ITV).name.substring(0, 8) + "..."
            : (data as ITV).name}
        </h3>
        <span>
          {isMovie
            ? (data as IMovie).release_date
            : (data as ITV).first_air_date}
        </span>
      </Info>
    </Container>
  );
};

export default SlideSimilar;
