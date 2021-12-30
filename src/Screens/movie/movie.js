import React, { useEffect, useState } from "react";
import { moviesApi } from "api";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "components/section";
import Loading from "components/loading";
import Message from "components/message";

const Container = styled.div`
  padding: 0px 10px;
`;

const Movie = () => {
  console.log("movie render");

  const [nowPlaying, setNowPlaying] = useState();
  const [upComing, setUpcoming] = useState();
  const [popular, setPopular] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [isMovie, setIsMovie] = useState(true);

  const getPopular = () => {
    return moviesApi.popular();
  };

  const getNowPlay = () => {
    return moviesApi.nowPlaying();
  };

  const getUpComing = () => {
    return moviesApi.upComing();
  };

  useEffect(async () => {
    try {
      const [
        {
          data: { results: popular },
        },
        {
          data: { results: nowPlaying },
        },
        {
          data: { results: upComing },
        },
      ] = await Promise.all([getPopular(), getNowPlay(), getUpComing()]);
      setNowPlaying(nowPlaying);
      setPopular(popular);
      setUpcoming(upComing);
    } catch {
      setError("Not found data! plaese check network");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Movies | Kimflix</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {popular && popular.length > 0 && (
            <Section
              title="Popular"
              data={popular}
              background={true}
              isMovie={isMovie}
            />
          )}

          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="nowPlaying" data={nowPlaying} isMovie={isMovie} />
          )}

          {upComing && upComing.length > 0 && (
            <Section title="UpComing" data={upComing} isMovie={isMovie} />
          )}
          {error && <Message text={error} />}
        </Container>
      )}
    </>
  );
};

export default Movie;
