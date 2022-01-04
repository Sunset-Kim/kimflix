import React from "react";
import { IMovie, ITV } from "services/api";
import styled from "styled-components";
import { createImgPath } from "Utils/imgpath";
import { motion, Variants } from "framer-motion";
import Dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Container = styled(motion.div)`
  position: relative;
  font-size: 0.9rem;
  margin: 0 5px;
  width: 200px;
  flex-shrink: 0;
`;

const Image = styled.div<{ bgUrl: string | null }>`
  background-image: ${(props) =>
    props.bgUrl ? `url(${createImgPath(props.bgUrl)})` : ""};
  background-size: cover;
  background-position: center top;
  width: 100%;
  padding-top: 150%;
`;

const InfoContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 5px;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;

  h3 {
    font-size: 14px;
    margin-bottom: 0.3em;
  }

  ul {
    display: flex;
    font-size: 12px;
    span {
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

const boxVariants: Variants = {
  start: {
    scale: 1,
  },
  hover: {
    scale: 1.4,
    zIndex: 10,
    y: -20,
    transition: {
      type: "tween",
      delay: 0.5,
    },
  },
  exit: {
    scale: 1,
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
  },
};

interface SlidePosterProps {
  data: IMovie | ITV;
  index: number;
  isMovie: boolean;
  isDrag: boolean;
  onHover?: (i: number) => void;
}

const SlidePoster: React.FC<SlidePosterProps> = ({
  data,
  index,
  isMovie = false,
  isDrag,
  onHover,
}) => {
  const navigate = useNavigate();

  const onHoverStart = () => {
    if (!onHover) return;
    onHover(index);
  };

  const onSlideClick = (movieID: number) => {
    if (isDrag) return;
    navigate(`${movieID}`);
  };

  return (
    <Container
      layoutId={data.id + ""}
      variants={boxVariants}
      whileHover="hover"
      onClick={() => onSlideClick(data.id)}
      initial="start"
      onHoverStart={onHover && onHoverStart}
      transition={{
        type: "tween",
        duration: 0.5,
      }}
    >
      <Image
        bgUrl={
          data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : require("../assets/notfound.jpeg").default
        }
      />
      <InfoContainer variants={infoVariants}>
        <h3>{(data as IMovie).title || (data as ITV).name}</h3>
        <ul>
          {}
          <li>{Dayjs((data as IMovie).release_date).get("year")}</li>
          <span>•</span>
          <li>{"⭐️" + data.vote_average + " / 10"}</li>
        </ul>
      </InfoContainer>
    </Container>
  );
};

export default SlidePoster;
