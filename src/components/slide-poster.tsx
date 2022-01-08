import React from "react";
import { IMovie, IPerson, ITV } from "services/api";
import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Poster from "./poster";

const Container = styled(motion.div)`
  position: relative;
  font-size: 0.9rem;
  margin: 0 5px;
  width: 200px;
  flex-shrink: 0;
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

interface SlidePosterProps {
  data: IMovie | ITV | IPerson;
  index?: number;
  isDrag?: boolean;
  isPopup?: boolean;
  onHover?: (i: number) => void;
}

const SlidePoster: React.FC<SlidePosterProps> = ({
  data,
  index,
  isDrag,
  isPopup = false,
  onHover,
}) => {
  // hook
  const navigate = useNavigate();

  // custom var
  const isMovie = Object.keys(data).includes("title") ? true : false;

  // callback func
  /*
   * background 변경위해 index 상위 전달
   */
  const onHoverStart = () => {
    if (!onHover || !index) return;
    onHover(index);
  };

  /*
   * 1. 드래그 중에 push 방지
   * 2. popup이 있으면 popup으로 popup이 없으면 detail로 변경
   */
  const onSlideClick = (movieID: number) => {
    if (isDrag) return;
    if (!Object.keys(data).includes("gender")) {
      isPopup
        ? navigate(`${movieID}`)
        : navigate(`/${isMovie ? "movie" : "tv"}/detail/${movieID}`);
    }
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
      <Poster data={data}></Poster>
    </Container>
  );
};

export default SlidePoster;
