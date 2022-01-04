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
  padding-top: 110px;
`;

const Router = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/*" element={<Movie />} />
          <Route path="tv/*" element={<TV />} />
          <Route path=":category/detail/:id" element={<Detail />} />
          {/* <Route path="/movie/:id" element={<Detail />}></Route> */}
          {/* <Route path="/show/:id" element={<Detail />}></Route> */}
          {/* <Route path="/movie/list/:list" element={<List />}></Route> */}
          {/* <Route path="/tv/list/:list" element={<List />}></Route> */}
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default Router;
