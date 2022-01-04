import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie, ITV } from "services/api";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99;
  width: 60vw;
  height: 60vh;
  background: ${(props) => props.theme.color.background.default};
`;

const PopupImg = styled.img`
  width: 100%;
`;

const PopupTop = styled.div``;

interface PopupProps {
  data?: IMovie | ITV;
}

const Popup: React.FC<PopupProps> = ({ data }) => {
  const isMovie = data && "title" in data ? true : false;
  const navigate = useNavigate();
  const Match = useMatch(isMovie ? "/movie/:id" : "/tv/:id");

  const onClose = () => {
    isMovie ? navigate("/movie") : navigate("/tv");
  };

  return (
    <>
      {Match?.params && (
        <>
          <Overlay onClick={onClose} />
          <Container layoutId={Match.params.id + ""}>
            {data && (
              <>
                <PopupTop></PopupTop>
                <h2>{(data as IMovie).title || (data as ITV).name}</h2>
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Popup;
