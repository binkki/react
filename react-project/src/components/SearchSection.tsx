import React from 'react';
import StorageService from '../services/StorageService';

class SearchSection extends React.Component {
  searchValue: string;

  constructor(props: object) {
    super(props);
    this.searchValue = '';
    this.search = this.search.bind(this);
    this.input = this.input.bind(this);
  }

  search = () => {
    StorageService.saveSearchRequestParams(this.searchValue);
  };

  input = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.searchValue = (e.target as HTMLInputElement).value;
  };

  render() {
    return (
      <>
        <form className="search-wrapper" onSubmit={this.search}>
          <input
            id="search-input"
            type="search"
            placeholder="Search the site…"
            onChange={this.input}
          />
          <input className="search-submit" type="submit" value="Search" />
        </form>
      </>
    );
  }
}

export default SearchSection;
