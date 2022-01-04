import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Row = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  width: 100%;
  display: grid;
  padding: 0 20px;
  grid-template-columns: repeat(6, 1fr);
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  flex: 1;
  flex-wrap: nowrap;
  margin: 0 5px;
  color: red;
  font-size: 32px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth - 30,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 30,
  },
};

const Slider = () => {
  const [index, setIndex] = useState<number>(0);
  const [leaving, setLeaving] = useState(false);
  const increseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setIndex((prev) => prev + 1);
  };

  const toggleLeaving = () => setLeaving(false);

  return (
    <Container onClick={increseIndex}>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          key={index}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            type: "tween",
            duration: 3,
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box key={i}>{i}</Box>
          ))}
        </Row>
      </AnimatePresence>
    </Container>
  );
};

export default Slider;
