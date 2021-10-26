import React from 'react';
import SearchPresener from './search_presenter';

export default class extends React.Component {
  state = {
    movieResult: null,
    tvResult: null,
    Keyword: null,
    searchTerm: "",
    error: null,
    loading: false,
  }

  render() {
    const { movieResult, tvResult, Keyword, searchTerm, error, loading } = this.state;

    return (
      <SearchPresener
        movieResult={movieResult}
        tvResult={tvResult}
        Keyword={Keyword}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
      />
    )
  }
}