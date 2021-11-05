import React, { useEffect, useState } from 'react';
import { moviesApi } from "../../api";
import Loading from 'components/loading';
import styled from 'styled-components';
import Section from 'components/section';
import Poster from 'components/poster';
import Message from 'components/message';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css'



const Home = (props) => {
  const [popular, setPopular] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const getPopular = async () => {
    try {
      const { data: { results } } = await moviesApi.popular()
      setPopular(results);

    } catch {


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
  `;

  const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 3rem 0;

  .top {
    display: block;
    margin-bottom: 1rem;
  }
  .bottom {
    display: block;
  }

  .color {
    color: crimson;
  }
  `

  const SlideItem = styled.div`
  display:  flex;
  justify-content: center;
  align-items: center;
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
          <Swiper
            spaceBetween={50}
            loop={true}
            centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              1300: {
                slidesPerView: 5,
              },
            }}
          >
            {
              popular.map(movie => (
                <SwiperSlide key={movie.id}>
                  <SlideItem>
                    <Poster
                      id={movie.id}
                      imageUrl={movie.poster_path}
                      title={movie.title}
                      year={movie.release_date}
                      rating={movie.vote_average}
                      isMovie={true}
                    />
                  </SlideItem>

                </SwiperSlide>))
            }
          </Swiper>
        }

        {error && <Message text={error} />}
      </Container >)
  )
};

export default Home;