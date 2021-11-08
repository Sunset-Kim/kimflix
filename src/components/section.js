import React, { memo, useEffect, useState } from "react";
import PropType from "prop-types";
import styled from "styled-components";
import SlidePoster from "./slide-poster";
import { Link } from "react-router-dom"
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, {
  Autoplay
} from 'swiper';


SwiperCore.use([Autoplay]);

const Container = styled.div`
  width: 100%;
  padding: 2rem 1rem;
`;
const Title = styled.h2`
font-size: 1.4rem;
margin-bottom: 1rem;
`;

const BackgroundContainer = styled.div`
  position: relative;
  height: 50vh;
  border-radius: 10px;
  overflow: hidden;
  
`

const BackgroundImg = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  background-image: url(${props => props.bgImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right top;
  transition: background-image 300ms ease-in-out;
  mask-image: linear-gradient(to left,rgba(0, 0, 0, 1) , transparent 60%);
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
    margin-bottom: 1rem
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
`

const SwiperContainer = styled(Swiper)`

`

const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--primary);
  border-radius: 5px;

`

const Section = memo(({ title, data, background, isMovie }) => {
  const [renderData, setRenderData] = useState();
  const [index, setIndex] = useState(0);

  const handleSlideChange = (e) => {
    const index = e.realIndex;
    setIndex(index);
  }


  useEffect(() => {
    if (data && background) {
      const result = data.filter(movie => (movie.poster_path && movie.backdrop_path))
      setRenderData(result);
    } else {
      setRenderData(data);
    }
  }, [data])


  return (
    <Container>

      {
        // background
        renderData &&
        background && (
          (<BackgroundContainer>
            <BackgroundImg bgImg={`https://image.tmdb.org/t/p/original/${renderData[index].backdrop_path}`} />
            <BackgroundText>
              <div className="head">
                <h3 className="title">{isMovie ? renderData[index].title : renderData[index].name}</h3>

                <div className="head__info">
                  <span className="date">{isMovie ? renderData[index].release_date : renderData[index].first_air_date}</span>
                  <span className="rate">{renderData[index].vote_average ? `⭐️ ${renderData[index].vote_average} / 10` : "Not yet vote enough"}</span>
                </div>
              </div>

              <p>{renderData[index].overview.length > 200 ? renderData[index].overview.substr(0, 200) + '...' : renderData[index].overview}</p>
              <ButtonLink to={isMovie ? `/movie/${renderData[index].id}` : `/show/${renderData[index].id}`}>자세히보기</ButtonLink>
            </BackgroundText>

          </BackgroundContainer>))
      }

      {
        // title
        title &&
        (<Title>
          {title}
        </Title>)
      }

      {
        // slide
        renderData &&
        renderData.length > 0 &&
        <SwiperContainer
          loop={true}
          autoplay={background && {
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
          } spaceBetween={10} onSlideChange={handleSlideChange}>
          {
            renderData.map(movie =>
              <SwiperSlide className="shrink" key={movie.id} >
                <SlidePoster
                  data={movie}
                  isMovie={isMovie} />
              </SwiperSlide>)
          }
        </SwiperContainer>
      }

    </Container>)
})


Section.prototype = {
  title: PropType.string,
}

export default Section;