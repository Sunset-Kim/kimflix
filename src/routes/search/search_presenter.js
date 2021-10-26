import { createRef } from "react"
import styled from "styled-components"

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

const query = createRef();



export default ({ ...props }) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.current.value) {
      props.onSearch(query.current.value);
      query.current.value = '';
    }
  }


  return (
    <>
      <SearchBar onSubmit={handleSubmit}>
        <input ref={query} type="text" placeholder="검색어를 입력하세요" />
        <button type="submit">검색</button>
      </SearchBar>
    </>
  )
}