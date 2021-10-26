import React, { Component } from "react";
import PropType from "prop-types"
import styled from "styled-components";
import Section from "components/section";
import Loading from "components/loading";

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
    {loading ? (<Loading />) : (<Container>
      {nowPlaying && nowPlaying.length > 0 && <Section title="nowPlaying">{nowPlaying.map(movie => movie.title)}</Section>}

    </Container>)}
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