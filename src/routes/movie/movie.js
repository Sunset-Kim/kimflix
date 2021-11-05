import React, { useEffect, useState } from "react";
import { moviesApi } from "api"
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "components/section";
import Loading from "components/loading";
import Message from "components/message";
import Poster from "components/poster";

const Container = styled.div`
  padding: 0px 10px;
`;

const Movie = () => {

  const [nowPlaying, setNowPlaying] = useState()
  const [upComing, setUpcoming] = useState()
  const [popular, setPopular] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  const getPopular = () => {
    return moviesApi.popular();
  }

  const getNowPlay = () => {
    return moviesApi.nowPlaying();
  }

  const getUpComing = () => {
    return moviesApi.upComing();
  }

  useEffect(async () => {
    try {
      const [{ data: { results: popular } }, { data: { results: nowPlaying } }, { data: { results: upComing } }] = await Promise.all([getPopular(), getNowPlay(), getUpComing()]);
      setNowPlaying(nowPlaying);
      setPopular(popular);
      setUpcoming(upComing);

    } catch {
      setError("Not found data! plaese check network")
    } finally {
      setLoading(false);
    }
  }, [])

  return <>
    <Helmet>
      <title>Movies | Kimflix</title>
    </Helmet>
    {
      loading ?
        (<Loading />) :
        (<Container>

          {nowPlaying
            && nowPlaying.length > 0
            && <Section title="nowPlaying">
              {
                nowPlaying.map(movie =>
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    year={movie.release_date}
                    rating={movie.vote_average}
                    isMovie={true}
                  />)}
            </Section>
          }

          {
            popular &&
            popular.length > 0 &&
            <Section title="Popular">
              {
                popular.map(movie =>
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    year={movie.release_date}
                    rating={movie.vote_average}
                    isMovie={true}
                  />)
              }
            </Section>
          }

          {
            upComing &&
            upComing.length > 0 &&
            <Section title="UpComing..">
              {
                upComing.map(movie =>
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    year={movie.release_date}
                    rating={movie.vote_average}
                    isMovie={true}
                  />)
              }
            </Section>
          }
          {error && <Message text={error} />}
        </Container>)
    }
  </>
}

export default Movie;