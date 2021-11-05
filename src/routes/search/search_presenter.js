import React, { createRef } from "react";
import PropType from "prop-types"
import styled from "styled-components";
import Loading from "components/loading";
import Section from "components/section";
import Message from "components/message";
import Poster from "components/poster";
import { Helmet } from "react-helmet";

const SearchBar = styled.form`
  position: relative;

  input {
    width: 100%;
    border-radius: 50px;
    padding: 1rem 1rem;
    
  }

  button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`

const Container = styled.div`
  padding: 10px 10px;
`


const SearchPresenter = ({
  currentResult,
  searchTerm,
  error,
  loading,
  onSearch,
  updateTerm
}) => {

  const checkMediaType = (data) => {
    switch (data.media_type) {
      case 'movie':
        return (
          <Poster
            key={data.id}
            id={data.id}
            imageUrl={data.poster_path}
            title={data.title}
            year={data.release_date}
            rating={data.vote_average}
            isMovie={true}
          />
        )

        break;

      case 'tv':
        return (
          <Poster
            key={data.id}
            id={data.id}
            imageUrl={data.poster_path}
            title={data.name}
            year={data.release_date}
            rating={data.vote_average}
            isMovie={false}
          />
        );
        break;

      case 'person':
        return (
          <Poster
            key={data.id}
            id={data.id}
            imageUrl={data.profile_path}
            title={data.name}
            isMovie={false}
          />
        );
        break;

      default:
        console.log('data media type error');
        break;
    }


  }

  return (
    <>
      <Helmet>
        <title>TV | Kimflix</title>
      </Helmet>
      <SearchBar onSubmit={onSearch}>
        <input type="text" placeholder="검색어를 입력하세요" onChange={updateTerm} value={searchTerm} />
        <button type="submit">검색</button>
      </SearchBar>
      {
        loading ?
          (<Loading></Loading>) :
          (<Container>
            {console.log(currentResult)}
            {
              currentResult &&
              currentResult.length > 0 &&
              <Section title={`${currentResult.length} results found for ${searchTerm}`}>
                {currentResult.map(checkMediaType)}
              </Section>
            }

            {error && <Message text={error} />}
            {currentResult && currentResult.length === 0 && <Message text="Not Found Results" />}
          </Container>)}
    </>
  )
};

SearchPresenter.prototype = {
  currentResult: PropType.array,
  searchTerm: PropType.array,
  error: PropType.string,
  loading: PropType.bool.isRequired,
  onSearch: PropType.func.isRequired,
  updateTerm: PropType.func.isRequired
}


export default SearchPresenter;