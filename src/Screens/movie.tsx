import { IGetMovie, moviesApi } from "services/api";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "components/section";
import Loading from "components/loading";
import Message from "components/message";
import { useQuery } from "react-query";
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
  const DATA =
    popularData?.results &&
    upComingData?.results &&
    nowPlayingData?.results &&
    popularData.results.concat(upComingData.results, nowPlayingData.results);
  const clickedMovie =
    MovieIdMatch?.params.id &&
    DATA &&
    DATA.find((movie) => movie.id + "" === MovieIdMatch.params.id);

  const filteredNowPlaying = nowPlayingData?.results.filter((movie) => {
    const id = movie.id;
    const popularIDArray = popularData?.results.map((movie) => movie.id);
    if (!popularIDArray?.includes(id)) return movie;
  });

  const filteredUpcoming = upComingData?.results.filter((movie) => {
    const id = movie.id;
    const popularIDArray = popularData?.results.map((movie) => movie.id);
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
              data={popularData.results}
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
