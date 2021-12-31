import React, { useEffect, useState } from "react";
import { IGetMovie, moviesApi } from "services/api";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "components/section";
import Loading from "components/loading";
import Message from "components/message";
import { useQuery } from "react-query";

const Container = styled.div`
  padding: 0px 10px;
`;

const Movie = () => {
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isError: nowPlayingError,
  } = useQuery<IGetMovie>(["movies", "nowPlaying"], () =>
    moviesApi.nowPlaying()
  );
  const {
    isLoading: popularLoading,
    data: popularData,
    isError: popularError,
  } = useQuery<IGetMovie>(["movies", "popular"], () => moviesApi.popular());

  const {
    isLoading: upComingLoading,
    data: upComingData,
    isError: upComingError,
  } = useQuery<IGetMovie>(["movies", "upComing"], () => moviesApi.upComing());

  const isLoading = nowPlayingLoading || popularLoading || upComingLoading;
  const isError = nowPlayingError || popularError || upComingError;

  return (
    <>
      <Helmet>
        <title>Movies | Kimflix</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          {popularData && (
            <Section
              title="Popular"
              data={popularData.results}
              background={true}
              isMovie={true}
            />
          )}

          {nowPlayingData && (
            <Section
              title="nowPlaying"
              data={nowPlayingData.results}
              isMovie={true}
            />
          )}

          {upComingData && (
            <Section
              title="UpComing"
              data={upComingData.results}
              isMovie={true}
            />
          )}
          {isError && <Message text={"isError"} />}
        </Container>
      )}
    </>
  );
};

export default Movie;
