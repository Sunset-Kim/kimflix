import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import SlidePoster from "../components/slide-poster";

SwiperCore.use([Autoplay]);

const SwiperContainer = styled(Swiper)`
width: 100%;

`

const SlideContents = ({ data, isMovie, autoplay = false, loop = true, link = true }) => {
  return (
    // slide
    data &&
    data.length > 0 &&
    <SwiperContainer
      loop={loop}
      autoplay={autoplay && {
        "delay": 3000,
        "disableOnInteraction": false
      }}
      slidesPerView={1}
      breakpoints={{
        '320': {
          "slidesPerView": 3,
        },
        '640': {
          "slidesPerView": 4,
        },
        '1024': {
          "slidesPerView": 5,
        },
        '1200': {
          "slidesPerView": 6,
        },
        '1600': {
          "slidesPerView": 7,
        },
      }
      }
      spaceBetween={10}>
      {
        data.map(movie =>
          <SwiperSlide className="shrink" key={movie.id} >
            <SlidePoster
              link={link}
              data={movie}
              isMovie={isMovie} />
          </SwiperSlide>)
      }
    </SwiperContainer>
  )
};

export default SlideContents;