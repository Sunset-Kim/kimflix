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

  updateTerm = event => {
    const { target: { value } } = event
    this.setState({ searchTerm: value })
  }

  onSearch = event => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== '') {
      this.searchByTerm()
    }
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


  render() {
    const { currentResult, searchTerm, error, loading } = this.state;

    return (
      <SearchPresener
        currentResult={currentResult}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        onSearch={this.onSearch}
        updateTerm={this.updateTerm}
      />
    )
  }
}