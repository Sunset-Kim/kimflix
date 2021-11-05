import React, { Component } from "react";
import PropType from "prop-types"
import styled from "styled-components";
import Section from "components/section";
import Loading from "components/loading";
import Message from "components/message";
import Poster from "components/poster";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 10px;
`;


const HomePresenter = ({
  nowPlaying,
  upComing,
  popular,
  error,
  loading,

}) => (
  <>
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
);

HomePresenter.prototype = {
  nowPlaying: PropType.array,
  upComing: PropType.array,
  popular: PropType.array,
  error: PropType.string,
  loading: PropType.bool.isRequired,
}


export default HomePresenter;