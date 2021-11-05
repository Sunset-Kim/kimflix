import React, { Component } from "react";
import PropType from "prop-types"
import styled from "styled-components";
import Loading from "components/loading";
import Section from "components/section";
import Message from "components/message";
import Poster from "components/poster";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 10px;
`

const TVPresenter = ({
  topRated,
  popular,
  airingToday,
  error,
  loading, }) => (
  <>
    <Helmet>
      <title>TV | Kimflix</title>
    </Helmet>
    {
      loading ?
        (<Loading></Loading>) :
        (<Container>
          {
            topRated &&
            topRated.length > 0 &&
            <Section title="Top Rate">
              {topRated.map(show =>
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.name}
                  year={show.first_air_date}
                  rating={show.vote_average}
                  isMovie={false}
                />)}
            </Section>
          }
          {
            airingToday &&
            airingToday.length > 0 &&
            <Section title="airingToday">
              {airingToday.map(show => <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                year={show.first_air_date}
                rating={show.vote_average}
                isMovie={false}
              />)}
            </Section>
          }
          {
            popular &&
            popular.length > 0 &&
            <Section title="Popular">
              {popular.map(show => <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                year={show.first_air_date}
                rating={show.vote_average}
                isMovie={false}
              />)}
            </Section>
          }

          {error && <Message text={error} color="crimson"></Message>}

        </Container>
        )
    }
  </>
)

TVPresenter.prototype = {
  topRated: PropType.array,
  popular: PropType.array,
  airingToday: PropType.array,
  error: PropType.string,
  loading: PropType.bool.isRequired,
}


export default TVPresenter;