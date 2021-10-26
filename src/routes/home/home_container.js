import { moviesApi } from "api";
import React from "react";
import HomePresenter from "./home_presenter";

export default class extends React.Component {

  state = {
    nowPlaying: null,
    upComing: null,
    popular: null,
    error: null,
    loading: true,
  }

  async componentDidMount() {
    try {
      const [{ data: { results: popular } }, { data: { results: nowPlaying } }, { data: { results: upComing } }] = await Promise.all([this.getPopular(), this.getNowPlay(), this.getUpComing()]);

      this.setState({
        popular,
        nowPlaying,
        upComing
      })


    } catch {
      this.setState({
        error: "Can't find movies information"
      })
    } finally {
      this.setState({
        loading: false
      })
    }

  }

  getPopular() {
    return moviesApi.popular();
  }

  getNowPlay() {
    return moviesApi.nowPlaying();
  }

  getUpComing() {
    return moviesApi.upComing();
  }

  render() {
    const { nowPlaying, upComing, popular, error, loading } = this.state;
    console.log(this.state);

    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upComing={upComing}
        popular={popular}
        error={error}
        loading={loading} />
    )
  }
}