import { IGetMovie, moviesApi } from "services/api";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "components/section";
import Loading from "components/loading";
import Message from "components/message";
import { useInfiniteQuery, useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import Popup from "components/popup";

const Container = styled.div``;

const Movie = () => {
  const MovieIdMatch = useMatch(`/movie/:id`);

  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isError: nowPlayingError,
  } = useInfiniteQuery<IGetMovie>(["movies", "list", "nowplaying"], () =>
    moviesApi.nowPlaying()
  );

  const {
    isLoading: popularLoading,
    data: popularData,
    isError: popularError,
  } = useInfiniteQuery<IGetMovie>(["movies", "list", "popular"], () =>
    moviesApi.popular()
  );

  const {
    isLoading: upComingLoading,
    data: upComingData,
    isError: upComingError,
  } = useInfiniteQuery<IGetMovie>(["movies", "list", "upcoming"], () =>
    moviesApi.upComing()
  );

  const isLoading = nowPlayingLoading || popularLoading || upComingLoading;
  const isError = nowPlayingError || popularError || upComingError;
  const DATA =
    popularData?.pages[0].results &&
    upComingData?.pages[0].results &&
    nowPlayingData?.pages[0].results &&
    popularData.pages[0].results.concat(
      upComingData.pages[0].results,
      nowPlayingData.pages[0].results
    );
  const clickedMovie =
    MovieIdMatch?.params.id &&
    DATA &&
    DATA.find((movie) => movie.id + "" === MovieIdMatch.params.id);

  const filteredNowPlaying = nowPlayingData?.pages[0].results.filter(
    (movie) => {
      const id = movie.id;
      const popularIDArray = popularData?.pages[0].results.map(
        (movie) => movie.id
      );
      if (!popularIDArray?.includes(id)) return movie;
    }
  );

  const filteredUpcoming = upComingData?.pages[0].results.filter((movie) => {
    const id = movie.id;
    const popularIDArray = popularData?.pages[0].results.map(
      (movie) => movie.id
    );
    if (!popularIDArray?.includes(id)) return movie;
  });

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
              data={popularData.pages[0].results}
              background={true}
            />
          )}

          {nowPlayingData && (
            <Section title="nowPlaying" data={filteredNowPlaying} />
          )}

          {upComingData && <Section title="UpComing" data={filteredUpcoming} />}

          {isError && <Message text={"isError"} />}

          <AnimatePresence>
            <Popup data={clickedMovie || undefined} />
          </AnimatePresence>
        </Container>
      )}
    </>
  );
};

export default Movie;
