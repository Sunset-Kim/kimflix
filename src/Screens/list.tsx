import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { tvApi, moviesApi, IGetTV, IGetMovie } from "services/api";
import SlidePoster from "components/slide-poster";
import { useMatch } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { result, toLower, uniqBy, uniqueId } from "lodash";

const Wrapper = styled.div`
  padding: 110px 20px 0;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    margin-bottom: 10px;
  }
`;

const Title = styled.h1`
  padding: 20px;
  font-size: 3rem;
  text-transform: capitalize;
`;

const Loader = styled.div`
  display: flex;
  background: red;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  height: 10px;
  font-size: 2rem;
  font-weight: bold;
`;

const List: React.FC = () => {
  const match = useMatch(":isMovie/list/:category");
  const isMovie = match?.params.isMovie === "movie" ? true : false;
  const category = match?.params.category;

  const getApi = (category?: string) => {
    const api = isMovie ? moviesApi : tvApi;
    const index = Object.keys(api)
      .map((string) => toLower(string))
      .indexOf(category as string);
    return Object.values(api)[index] as (
      page: number
    ) => Promise<IGetMovie & IGetTV>;
  };

  const {
    data: listData,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery(
    [isMovie ? "movies" : "tv", "list", category],
    ({ pageParam = 1 }) => getApi(category)(pageParam),
    {
      getNextPageParam: (lastpage, page) => {
        if (lastpage.total_pages > lastpage.page) {
          return lastpage.page + 1;
        } else {
          return;
        }
      },
    }
  );

  const filteredData = uniqBy(
    listData?.pages
      .map((page) => page.results)
      .reduce((acc, cur) => [...acc, ...cur]),
    "id"
  );
  // ref
  const loader = useRef<HTMLDivElement>();

  // intersection observer
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0];

      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [isLoading]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  return !isLoading ? (
    <Wrapper>
      <Title>
        {isMovie ? "Movie" : "TV"} / {category}
      </Title>
      <Container>
        {filteredData?.map((item) => (
          <SlidePoster key={item.id} data={item} index={1} />
        ))}
      </Container>
      {!isLoading && (
        <Loader ref={loader as any}>
          {!hasNextPage && "모든 정보를 다 받아왔습니다!"}
        </Loader>
      )}
    </Wrapper>
  ) : (
    <></>
  );
};

export default List;
