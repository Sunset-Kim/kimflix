import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { tvApi, moviesApi } from 'api';
import SlidePoster from 'components/slide-poster';
import _ from "lodash";


const Container = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.2fr));
  gap: 10px;
`;

const Title = styled.h1`
  padding: 20px;
  font-size: 3rem;
  text-transform: capitalize;
`

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 3rem 0;
  font-size: 2rem;
  font-weight: bold;
`;

const Complete = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 2rem;
font-weight: bold;
margin: 3rem 0;
`;

const useFetch = (list, isMovie, page) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isComplete, setIsComplete] = useState();

  const getList = async (page) => {
    try {
      await setLoading(true);
      let results;
      if (isMovie) {
        switch (list) {
          case 'popular':
            ({ data: { results } } = await moviesApi.popular(page));
            break;

          case 'nowplaying':
            ({ data: { results } } = await moviesApi.nowPlaying(page));
            break;

          case 'upcoming':
            ({ data: { results } } = await moviesApi.upComing(page));
            break;
        }
      } else {
        switch (list) {
          case 'popular':
            ({ data: { results } } = await tvApi.popular(page));
            break;

          case 'toprate':
            ({ data: { results } } = await tvApi.topRated(page));
            break;

          case 'airingtoday':
            ({ data: { results } } = await tvApi.airingToday(page));
            break;
        }
      }
      await setIsComplete(!results || results.length <= 0);
      await setData(prev => _.uniqBy([...prev, ...results], 'id'));
      setLoading(false);
    } catch {
      setError('api에서 정보를 받아오지 못했습니다.')

    } finally {

    }
  }


  useEffect(() => {
    getList(page);

  }, [page]);

  return {
    loading,
    error,
    data,
    isComplete
  }
}

const List = (props) => {
  const { location: { pathname }, match: { params: { list } } } = props;

  // ref
  const loader = useRef();
  // state
  const [page, setPage] = useState(1);
  const [isMovie, setIsMovie] = useState(pathname.indexOf('movie') === 1 ? true : false)
  const { loading, error, data, totalPages, isComplete } = useFetch(list, isMovie, page);

  // intersection observer
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isComplete) {
      setPage(prev => prev + 1)
    }
  }, [])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    }
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => {
      observer.disconnect();
    }
  }, [pathname])

  return (

    <>
      <Title>
        {isMovie ? "Movie" : "TV"} / {list}
      </Title>
      <Container>
        {
          data &&
          data.map(item => <SlidePoster key={item.id} data={item} isMovie={isMovie} />)
        }
      </Container >
      {isComplete && <Complete>모든 결과값을 불러왔습니다!!</Complete>}
      {console.log(loading)}
      <Loader ref={loader}>{loading && !isComplete && "로딩중..."}</Loader>
    </>

  )
}

export default List;