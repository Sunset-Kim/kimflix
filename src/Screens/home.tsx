import React from "react";
import { IGetMovie, moviesApi } from "../services/api";
import Loading from "components/loading";
import styled from "styled-components";
import Message from "components/message";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import MainPoster from "components/main-poster";
import { useQuery } from "react-query";

SwiperCore.use([EffectCoverflow]);

// styled components
const Container = styled.div`
  padding: 0 20px;
  padding-top: 10%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  ${(props) => props.theme.media.tablet`
  padding: 0;
  padding-top: 5%;
  `};
`;

const Title = styled.h2`
  flex: 0;
  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: bold;
  margin: 3rem 0;

  .top {
    display: block;
  }
  .bottom {
    display: block;
  }

  @media (max-width: 640px) {
    font-size: 6vw;
    line-height: 8vw;
    margin: 2rem 0;
  }
`;

const SlideContainer = styled(Swiper)`
  flex: 1;
  width: 100%;
`;

const Home: React.FC = (props) => {
  const { isLoading, data, isError } = useQuery<IGetMovie>(
    ["movies", "popular"],
    () => moviesApi.popular()
  );

  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      {
        <Title>
          <span className="top">최신영화와 컨텐츠를 한눈에!</span>
          <span className="bottom">
            <b className="color">다양한 디바이스</b>에서 손쉽게 접근해요!
          </span>
        </Title>
      }

      {data?.results && data.results.length > 0 && (
        <SlideContainer
          effect={"coverflow"}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 30,
              effect: "slide",
            },
            641: {
              slidesPerView: 3,
              spaceBetween: 30,
            },

            1300: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 1,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
        >
          {data.results.map((movie: any) => (
            <SwiperSlide key={movie.id}>
              <MainPoster movie={movie} isMovie={true} />
            </SwiperSlide>
          ))}
        </SlideContainer>
      )}

      {isError && <Message text={"데이터를 받아올수 없습니다"} />}
    </Container>
  );
};

export default Home;
