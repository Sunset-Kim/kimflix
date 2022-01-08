import React, { useState, useEffect, useRef } from "react";
import {
  IGetMovie,
  IGetTV,
  IMovie,
  IPerson,
  ITV,
  searchApi,
} from "services/api";
import styled from "styled-components";
import Message from "components/message";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import SlidePoster from "components/slide-poster";
import Poster from "components/poster";

const Wrapper = styled.div`
  padding: 110px 10px 0;
`;

const Title = styled.h1`
  padding: 20px;
  font-size: 3rem;
  text-transform: capitalize;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    margin-bottom: 10px;
  }
`;

const Search: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query") ?? undefined;

  const { data, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery<any>(
      ["search", query],
      ({ pageParam = 1 }) => searchApi.multi(query),
      {
        getNextPageParam: (lastpage, page) => {
          if (lastpage.total_pages > lastpage.page) {
            return lastpage.page + 1;
          } else {
            return;
          }
        },
        enabled: !!query,
      }
    );

  return (
    <>
      <Helmet>
        <title>Search | Kimflix</title>
      </Helmet>
      <Wrapper>
        <Title>{query ?? null}에 대한 검색결과</Title>
        <Container>
          {data?.pages.map((item) =>
            item.results.map(
              (result: { media_type: string } & (IMovie | ITV | IPerson)) => (
                <SlidePoster data={result} />
              )
            )
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default Search;
