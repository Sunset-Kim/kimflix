import React, { useEffect, useState } from 'react';
import { moviesApi } from "../../api";
import Loading from 'components/loading';
import styled from 'styled-components';
import Message from 'components/message';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectCoverflow

} from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css'
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
import MainPoster from 'components/main_poster';

SwiperCore.use([EffectCoverflow])

const Home = (props) => {
  const [popular, setPopular] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const getPopular = async () => {
    try {
      const { data: { results } } = await moviesApi.popular()
      setPopular(results);

    } catch {
      setError('Not found data')
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPopular();
  }, [])

  // styled components
  const Container = styled.div`
    padding: 2rem;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;

    @media (max-width: 320px) {
    padding: 1rem;
  }


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

  `

  const SlideContainer = styled(Swiper)`
    flex: 1;
    width: 100%;
  `

  return (
    loading ? (<Loading />) :
      (<Container>
        {
          <Title>
            <span className="top">
              최신영화와 컨텐츠를 한눈에!
            </span>
            <span className="bottom">
              <b className="color">다양한 디바이스</b>에서 손쉽게 접근해요!
            </span>
          </Title>
        }
        {
          popular &&
          popular.length > 0 &&
          <SlideContainer
            effect={'coverflow'}
            loop={true}
            centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
                effect: 'slide'
              },
              641: {
                slidesPerView: 3,
                spaceBetween: 30
              },

              1300: {
                slidesPerView: 5,
                spaceBetween: 50
              }
            }}
            coverflowEffect={{
              "rotate": 20,
              "stretch": 1,
              "depth": 100,
              "modifier": 1,
              "slideShadows": false
            }}
          >
            {
              popular.map(movie => (
                <SwiperSlide key={movie.id}>
                  <MainPoster
                    movie={movie}
                    isMovie={true}
                  />
                </SwiperSlide>))
            }
          </SlideContainer>
        }

        {error && <Message text={error} />}
      </Container >)
  )
};

export default Home;