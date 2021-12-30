import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Screens/home";
import Search from "Screens/search";
import Movie from "Screens/movie";
import TV from "Screens/tv";
import Detail from "Screens/detail";
import Header from "./header";
import List from "Screens/list";
import styled from "styled-components";

const BodyContainer = styled.div`
  padding-top: 120px;
`;

const Router = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <BodyContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/search" element={<Search />} />
            <Route path="/tv" element={<TV />} />
            <Route path="/movie/:id" element={<Detail />}></Route>
            <Route path="/show/:id" element={<Detail />}></Route>
            <Route path="/movie/list/:list" element={<List />}></Route>
            <Route path="/tv/list/:list" element={<List />}></Route>
          </Routes>{" "}
        </BodyContainer>
      </>
    </BrowserRouter>
  );
};

export default Router;

/**
 * - hash vs browser
 * 1. 간단함
 * 2. app에서 작동하는 것처럼 보여줌
 * 3. hash 기능 사용가능
 *
 * - browser
 * 1. 실제 브라우저처럼 작동함
 * 2. html history api 를 지원함
 *
 *
 * - router composition => 2개이상의 라우터를 랜더링하는 방식 (동시에)
 * path가 동시에 해당하면 동시에 보여줌
 *
 * - redirect
 * 일치하는 path 가 없으면 redirect 로 가게됨
 * Switch 없이 하게되면 전부다 redirect로 간다. router composition 때문에
 *
 * - switch
 * 한번에 하나의 path만 연결가능
 *
 */
