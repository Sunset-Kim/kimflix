import React, { createRef } from "react";
import PropType from "prop-types"
import styled from "styled-components";

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



const SearchPresenter = ({
  currentResult,
  searchTerm,
  error,
  loading,
  onSearch }) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.current.value) {
      onSearch(query.current.value);
      query.current.value = '';
    }
  }

  const query = createRef();


  return (
    <>
      <SearchBar onSubmit={handleSubmit}>
        <input ref={query} type="text" placeholder="검색어를 입력하세요" />
        <button type="submit">검색</button>
      </SearchBar>
    </>
  )
};

SearchPresenter.prototype = {
  currentResult: PropType.array,
  searchTerm: PropType.array,
  error: PropType.string,
  loading: PropType.bool.isRequired,
  onSearch: PropType.func.isRequired,
}


export default SearchPresenter;