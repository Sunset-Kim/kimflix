import { searchApi } from 'api';
import React from 'react';
import SearchPresener from './search_presenter';

export default class extends React.Component {
  state = {
    currentResult: null,
    searchTerm: "",
    error: null,
    loading: false,
  }

  onSearch = (query) => {
    this.setState({ searchTerm: query });
  }
  getResult = () => searchApi.multi(this.state.searchTerm);

  searchByTerm = async () => {
    try {
      this.setState({ loading: true });

      const { data: { results: currentResult } } = await this.getResult()
      this.setState({ currentResult })
    }
    catch {
      this.setState({ error: "is not find result" });
    }
    finally {
      this.setState({ loading: false })
    }
  }

  componentDidUpdate(prevProps, prevState) {

    // search term이 바뀔때만 검색
    if (this.state.searchTerm !== prevState.searchTerm) {
      this.searchByTerm();
    }

  }



  render() {
    const { currentResult, searchTerm, error, loading } = this.state;

    return (
      <SearchPresener
        currentResult={currentResult}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        onSearch={this.onSearch}
      />
    )
  }
}