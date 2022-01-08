import React, { useRef, useState } from "react";
import styled from "styled-components";
import SlidePoster from "./slide-poster";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createImgPath } from "Utils/imgpath";
import { IMovie, ITV } from "services/api";
import { LinkButton } from "components/button";

// ### style
const Container = styled.div``;

const Title = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.4rem;
  }

  .btn_more {
    padding: 0.5rem 1rem;
    border: 1px solid var(--primary);
    border-radius: 0.5rem;
    transition: background 300ms ease-in-out;
    &:hover {
      background: var(--primary);
    }
  }
`;

const BackgroundContainer = styled.div`
  position: relative;
  min-height: 80vh;
  height: auto;
  overflow: hidden;
  background: ${(props) => props.theme.color.background.default};
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 5%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 1)
  );
`;

const BackgroundImg = styled(Overlay)<{ bgImg: string }>`
  z-index: -12;
  background-image: ${({ bgImg }) =>
    `url(${createImgPath(bgImg, "original")})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left top;
  transition: background-image 0.2s ease-in-out;
`;

const BackgroundText = styled.div`
  padding: 0 30px;
  position: absolute;
  width: 100%;
  top: 30%;
  left: 0;
  z-index: 1;
  min-width: 280px;

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  .head__info {
    font-size: 14px;
    margin-bottom: 1em;
    .date {
      margin-right: 1em;
    }
  }

  p {
    font-size: 14px;
    line-height: 1.4em;
    margin-bottom: 1em;
  }

  /* tablet */
  ${(props) => props.theme.media.tablet`
  width: 70%;

  h3 {
    font-size: 24px;
  }

  .head__info {
    font-size: 15px;
  }

  p {
    font-size: 16px;
    line-height: 1.4em;
    margin-bottom: 2em;
  }
  
  `}

  /* desktop */
  ${(props) => props.theme.media.desktop`
  width: 50%;
  `}
`;

const ContentsContainer = styled.div<{ isBackground: Boolean }>`
  position: relative;
  z-index: 11;
  margin: 0 2rem;
  /* margin-top: ${(props) => (props.isBackground ? "-100px" : "")}; */
  margin-bottom: 60px;
`;
const SlideContainer = styled.div``;

const SlideWrapper = styled(motion.div)`
  width: fit-content;
  display: flex;
`;

interface SectionProps {
  title: string;
  background?: boolean;
  data?: IMovie[] | ITV[];
}

// #### components

const Section: React.FC<SectionProps> = ({
  title,
  data,
  background = false,
}) => {
  const slideRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isMovie = data && "title" in data[0] ? true : false;

  const onHover = (index: number) => {
    setIndex(index);
  };

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDrageEnd = () => {
    setTimeout(() => setIsDragging(false), 1500);
  };

  const Data = data && isMovie ? (data as IMovie[]) : (data as ITV[]);

  return (
    <Container>
      {
        // banner
        Data && background && (
          <BackgroundContainer>
            <Overlay />
            <BackgroundImg bgImg={Data[index].backdrop_path ?? null} />
            <BackgroundText>
              <div className="head">
                <h3 className="title">
                  {(Data[index] as IMovie).title || (Data[index] as ITV).name}
                </h3>

                <div className="head__info">
                  <span className="date">
                    {(Data[index] as IMovie).release_date || null}
                  </span>
                  <span className="rate">
                    {Data[index].vote_average
                      ? `⭐️ ${Data[index].vote_average} / 10`
                      : "Not yet vote enough"}
                  </span>
                </div>
              </div>

              <p>
                {Data[index].overview.length > 200
                  ? Data[index].overview.substr(0, 200) + "..."
                  : Data[index].overview}
              </p>

              <LinkButton>
                <Link
                  to={
                    isMovie
                      ? `/movie/${Data[index].id}`
                      : `/tv/${Data[index].id}`
                  }
                >
                  자세히보기
                </Link>
              </LinkButton>
            </BackgroundText>
          </BackgroundContainer>
        )
      }
      <ContentsContainer isBackground={background}>
        {
          // title
          title && (
            <Title>
              <h2>{title}</h2>
              <Link
                to={`/${isMovie ? "movie" : "tv"}/list/${title
                  .replace(" ", "")
                  .toLowerCase()}`}
              >
                expand more
              </Link>
            </Title>
          )
        }

        {
          // slide
          data && (
            <SlideContainer ref={slideRef}>
              <SlideWrapper
                drag="x"
                dragConstraints={slideRef}
                onDragStart={onDragStart}
                onDragEnd={onDrageEnd}
              >
                {data &&
                  data.map((movie, i) => (
                    <SlidePoster
                      key={movie.id}
                      index={i}
                      isPopup
                      isDrag={isDragging}
                      data={movie}
                      onHover={onHover}
                    />
                  ))}
              </SlideWrapper>
            </SlideContainer>
          )
        }
      </ContentsContainer>
    </Container>
  );
};

export default Section;
