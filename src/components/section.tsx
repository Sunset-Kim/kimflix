import React, { useState } from "react";
import styled from "styled-components";
import SlidePoster from "./slide-poster";
import { Link } from "react-router-dom";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Autoplay } from "swiper";
import { createImgPath } from "Utils/imgpath";
import { IMovie, ITV } from "services/api";
import { SwiperEvents } from "swiper/types/swiper-events";

SwiperCore.use([Autoplay]);

// ### style
const Container = styled.div`
  width: 100%;
  padding: 2rem 1rem;
`;
const Title = styled.div`
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
  height: 80vh;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const BackgroundImg = styled.div<{ bgImg: string | null }>`
  width: 100%;
  height: 100%;
  display: flex;
  background-image: ${(props) =>
    props.bgImg ? `url(${createImgPath(props.bgImg, true)})` : ""};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right top;
  transition: background-image 300ms ease-in-out;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0),
    10%
  );
`;

const BackgroundText = styled.div`
  padding: 2rem;
  position: absolute;
  width: 70%;
  top: 0;
  left: 0;
  z-index: 1;

  h3 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .head__info {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    .date {
      margin-right: 1rem;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin-bottom: 2rem;
  }
`;

const SwiperContainer = styled(Swiper)``;

const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--primary);
  border-radius: 5px;
`;

interface SectionProps {
  title: string;
  background?: boolean;
  isMovie: boolean;
  data: IMovie[] | ITV[];
}

// #### components

const Section: React.FC<SectionProps> = ({
  title,
  data,
  background = false,
  isMovie,
}) => {
  const [index, setIndex] = useState(0);

  const handleSlideChange = (e: SwiperCore) => {
    const index = e.realIndex;
    setIndex(index);
  };

  return (
    <Container>
      {
        // background
        data && background && (
          <BackgroundContainer>
            <BackgroundImg bgImg={data[index].backdrop_path ?? null} />
            <BackgroundText>
              <div className="head">
                <h3 className="title">{data[index].title}</h3>

                <div className="head__info">
                  <span className="date">
                    {isMovie ? data[index].release_date : null}
                  </span>
                  <span className="rate">
                    {data[index].vote_average
                      ? `⭐️ ${data[index].vote_average} / 10`
                      : "Not yet vote enough"}
                  </span>
                </div>
              </div>

              <p>
                {data[index].overview.length > 200
                  ? data[index].overview.substr(0, 200) + "..."
                  : data[index].overview}
              </p>
              <ButtonLink
                to={
                  isMovie
                    ? `/movie/${data[index].id}`
                    : `/show/${data[index].id}`
                }
              >
                자세히보기
              </ButtonLink>
            </BackgroundText>
          </BackgroundContainer>
        )
      }

      {
        // title
        title && (
          <Title>
            <h2>{title}</h2>
            <Link
              className="btn_more"
              to={`${isMovie ? "movie" : "tv"}/list/${title
                .toLowerCase()
                .replace(" ", "")}`}
            >
              더보기
            </Link>
          </Title>
        )
      }

      {
        // slide
        data && (
          <SwiperContainer
            loop={true}
            autoplay={
              background && {
                delay: 3000,
                disableOnInteraction: false,
              }
            }
            slidesPerView={1}
            breakpoints={{
              "320": {
                slidesPerView: 3,
              },
              "640": {
                slidesPerView: 4,
              },
              "1024": {
                slidesPerView: 5,
              },
              "1200": {
                slidesPerView: 6,
              },
              "1600": {
                slidesPerView: 7,
              },
            }}
            spaceBetween={10}
            onSlideChange={handleSlideChange}
          >
            {data &&
              data.map((movie) => (
                <SwiperSlide className="shrink" key={movie.id}>
                  <SlidePoster data={movie} isMovie={isMovie} />
                </SwiperSlide>
              ))}
          </SwiperContainer>
        )
      }
    </Container>
  );
};

export default Section;
