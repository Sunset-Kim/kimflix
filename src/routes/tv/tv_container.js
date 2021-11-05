import { tvApi } from "api";
import React from "react";
import TVPresetner from "./tv_presenter"

export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    error: null,
    loading: true,
  }

  async componentDidMount() {
    try {
      const [{ data: { results: airingToday } }, { data: { results: topRated } }, { data: { results: popular } }] = await Promise.all([this.getAiringToday(), this.getTopRate(), this.getPopular()]);

      this.setState({
        airingToday,
        topRated,
        popular
      })

    }
    catch (e) {
      console.log(e);
      this.setState({
        error: "Can't find TV infomation"
      })
    }
    finally {
      this.setState({
        loading: false
      })
    }
  }

  getAiringToday = () => tvApi.airingToday()
  getTopRate = () => tvApi.topRated()
  getPopular = () => tvApi.popular()



  render() {

    const { topRated, popular, airingToday, error, loading } = this.state;
    console.log(this.state);
    return (
      <TVPresetner
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        error={error}
        loading={loading}
      />
    )
  }



}