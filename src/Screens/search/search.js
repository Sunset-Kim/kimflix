import React, { useState, useEffect, useRef } from 'react';
import { searchApi } from 'api';
import styled from "styled-components";
import Loading from "components/loading";
import { Person, Poster } from "components/search_result"
import Message from "components/message";
import { Helmet } from "react-helmet";
import { debounce } from 'lodash';


const Container = styled.div`
  padding: 10px 10px;
`;

const SearchBar = styled.div`
  padding: 0 10px;
  margin-top: 10px; 
  input {
    width: 100%;
    border-radius: 50px;
    padding: 1rem 1rem;
  }
`;

const ResultContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.2fr));
  gap: 10px;
`;

const Search = (props) => {
  // state
  const [currentResult, setCurrentResult] = useState(null);
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  // ref
  const inputEl = useRef();
  // debouce call
  const debounceCall = debounce((q) => {
    if (query === q) return
    setQuery(q)
  }, 1000)

  const handleChange = () => {
    const newQuery = inputEl.current.value;
    if (!newQuery || newQuery.length === 0) return
    debounceCall(newQuery);

  }

  const getResult = async (q) => {
    try {
      setLoading(true);
      const { data: { results: currentResult } } = await searchApi.multi(q)
      setCurrentResult(currentResult)
    } catch (error) {
      setError("is not found result");
    } finally {
      setLoading(false)
    }
  };

  useEffect((prev) => {

    if (query) {
      getResult(query)
    }

  }, [query])


  return (
    <>
      <Helmet>
        <title>Search | Kimflix</title>
      </Helmet>
      <SearchBar >
        <input type="text" ref={inputEl} placeholder="검색어를 입력하세요" onChange={handleChange} />
      </SearchBar>
      {
        loading ?
          (<Loading></Loading>) :
          (<Container>
            <ResultContainer>
              {
                currentResult &&
                currentResult.length > 0 &&
                (
                  currentResult.map(item =>
                    (item.media_type === "tv" || item.media_type === "movie") ?
                      <Poster key={item.id} data={item} /> :
                      <Person key={item.id} data={item} />
                  )
                )
              }

              {error && <Message text={error} />}
              {currentResult && currentResult.length === 0 && <Message text="Not Found Results" />}
            </ResultContainer>
          </Container>)}
    </>
  )

};

export default Search;