import React from "react";
import { Season } from "services/api";
import styled from "styled-components";
import { createImgPath } from "Utils/imgpath";
import { motion, Variants } from "framer-motion";

const Container = styled(motion.div)`
  position: relative;
  width: 150px;
  img {
    width: 100%;
    pointer-events: none;
  }
`;

const Info = styled(motion.div)`
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

const InfoVariants: Variants = {
  start: {
    opacity: 0,
  },

  end: {
    opacity: 1,
  },
};

interface SlideSeasonProps {
  data: Season;
}

const SlideSeason: React.FC<SlideSeasonProps> = ({ data }) => {
  return (
    <Container variants={InfoVariants}>
      <img src={createImgPath(data.poster_path, false)} alt={data.name} />
      <Info>
        <h3>{data.name}</h3>
        <span>{data.air_date}</span>
        <span>Episode Count : {data.episode_count}</span>
      </Info>
    </Container>
  );
};

export default SlideSeason;
