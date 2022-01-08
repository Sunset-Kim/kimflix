import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { Season, Company, ITV, IMovie } from "services/api";
import SlideLogo from "./slide-logo";
import SlideSeason from "./slide-season";
import SlideSimilar from "./slide-similar";

const SlideContainer = styled.div`
  width: fit-content;
  max-width: 100%;
`;

const SlideWrapper = styled(motion.div)`
  width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

const Slide = styled(motion.div)`
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

interface SlideContentsProps {
  data: {
    type: "company" | "season" | "similar";
    results: Season[] | Company[] | ITV[] | IMovie[];
  };
}

const SlideContents: React.FC<SlideContentsProps> = ({ data }) => {
  // darg관련
  const refContainer = useRef(null);
  const x = useMotionValue(0);
  const [isDrag, setIsDrag] = useState(false);

  const onDragStart = () => {
    setIsDrag(true);
  };

  const onDragEnd = () => {
    if (!isDrag) return;
    setTimeout(() => {
      setIsDrag(false);
    }, 1500);
  };

  return data ? (
    <SlideContainer ref={refContainer}>
      <SlideWrapper
        drag="x"
        style={{ x }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        dragConstraints={refContainer}
      >
        {data.type === "company"
          ? data.results.map((item) => (
              <Slide key={item.id}>
                <SlideLogo data={item as Company} />
              </Slide>
            ))
          : data.type === "season"
          ? data.results.map((item) => (
              <Slide key={item.id}>
                <SlideSeason data={item as Season} />
              </Slide>
            ))
          : data.results.map((item) => (
              <Slide key={item.id}>
                {
                  <SlideSimilar
                    data={"title" in item ? (item as IMovie) : (item as ITV)}
                    isDrag={isDrag}
                  />
                }
              </Slide>
            ))}
      </SlideWrapper>
    </SlideContainer>
  ) : null;
};

export default SlideContents;
