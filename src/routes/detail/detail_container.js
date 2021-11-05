import { moviesApi, tvApi } from "api";
import React from "react";
import DetailPresenter from './detail_presenter';

export default class extends React.Component {
  constructor(props) {
    super(props);

    const {
      location: { pathname }
    } = props;

    this.state = {
      result: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/")
    }
  }

  async componentDidMount() {
    
    const { isMovie } = this.state;

    const {
      match: { params: { id } },
      history: { push },
    } = this.props


    const parsedId = parseInt(id);
    console.log(this.props)

    // id가 숫자가 아니면 home으로 보내기
    if (isNaN(parsedId)) {
      return push('/');
    }

    let result;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.tvDetail(parsedId));
      }
      this.setState({ result })
    }
    catch {
      this.setState({ error: "결과가 존재하지 않습니다" })
    }
    finally {
      this.setState({ loading: false })
    }

  }

  render() {
    const { result, loading, error } = this.state;


    return (
      <DetailPresenter
        result={result}
        loading={loading}
        error={error}
      />
    )
  }
}