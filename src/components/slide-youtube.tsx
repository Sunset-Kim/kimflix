import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";
import { Videos } from "services/api";

SwiperCore.use([Autoplay, Navigation]);

const SwiperContainer = styled(Swiper)`
  overflow: visible;
  width: 100%;
  height: 100%;
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.5rem;
    color: white;
    transition: color 200ms;
  }

  .swiper-button-prev,
  .swiper-button-next {
    top: -1.4rem;
    &:hover {
      &::after {
        color: var(--primary);
      }
    }
  }
  .swiper-button-prev {
    left: unset;
    right: 2rem;
  }
  .swiper-button-next {
    right: 0;
  }
`;
interface SlideYoutubeProps {
  data?: Videos;
}
const SlideYoutube: React.FC<SlideYoutubeProps> = ({ data }) => {
  return (
    // slide
    data?.results && data.results.length > 0 ? (
      <SwiperContainer
        loop={false}
        navigation={true}
        slidesPerView={1}
        breakpoints={{
          "320": {
            slidesPerView: 2,
          },
          "640": {
            slidesPerView: 3,
          },
          "1024": {
            slidesPerView: 4,
          },
          "1200": {
            slidesPerView: 5,
          },
        }}
        spaceBetween={10}
      >
        {data.results.map((item) => (
          <SwiperSlide key={item.id}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    ) : null
  );
};

export default SlideYoutube;
