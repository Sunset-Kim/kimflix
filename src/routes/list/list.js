import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { tvApi, moviesApi } from 'api';
import SlidePoster from 'components/slide-poster';
import Loading from 'components/loading';

const Container = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.2fr));
  gap: 10px;
`;


const useFetch = (list, isMovie, page) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const getList = async (page) => {
    try {
      setLoading(true);
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


      setData(prev => [...prev, ...results]);

    } catch {
      setError('api에서 정보를 받아오지 못했습니다.')

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setData([]);
  }, [list])

  useEffect(async () => {
    getList(page);
  }, [page, list]);

  return {
    loading,
    error,
    data
  }
}

const List = (props) => {
  const { location: { pathname }, match: { params: { list } } } = props;

  // state
  const [isMovie, setIsMovie] = useState(pathname.indexOf('movie') === 1 ? true : false)
  const [page, setPage] = useState(1);
  const { loading, error, data } = useFetch(list, isMovie, page);
  // ref
  const loader = useRef();
  // intersection observe
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {

      setPage(prev => prev + 1)
      console.log(`페이지가 올라감 ${page}`)
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
  }, [handleObserver])





  return (
    <Container>

      {
        data &&
        data.map(item => <SlidePoster key={item.id} data={item} isMovie={isMovie} />)
      }
      <div ref={loader}>{page}</div>
    </Container >
  )
};

export default List;