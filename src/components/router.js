import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "routes/home";
import Search from "routes/search";
import Movie from "routes/movie";
import TV from "routes/tv";
import Detail from "routes/detail"
import Header from "./header";

export default () => (
  <Router>
    <>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movie" exact component={Movie} />
        <Route path="/search" component={Search} />
        <Route path="/tv" exact component={TV} />
        <Route path="/tv/popular" render={() => <h1>popular</h1>}></Route>
        <Route path="/movie/:id" component={Detail}></Route>
        <Route path="/show/:id" component={Detail}></Route>
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
)

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