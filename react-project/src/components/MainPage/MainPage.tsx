import React from 'react';
import ApiService from '../../services/ApiService';
import StorageService from '../../services/StorageService';
import { AppState, Character } from '../../types';
import './MainPage.css';
import ErrorButton from './ErrorButton';
import {
  SEARCH_PLACEHOLDER,
  LOADING_DATA,
  EMPTY_DATA,
} from '../../utils/constants';

class MainPage extends React.Component {
  state: AppState = {
    searchValue: '',
    characters: [],
    loading: false,
  };

  componentDidMount() {
    this.search();
  }

  input = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.state.searchValue = (e.target as HTMLInputElement).value;
  };

  search = async () => {
    this.setState({ loading: true });
    ApiService.getCharacters().then((value: Character[]) =>
      this.setState({ loading: false, characters: value })
    );
  };

  submitSearch = () => {
    StorageService.saveSearchRequestParams(this.state.searchValue);
    this.search();
  };

  render() {
    return (
      <>
        <div className="main-wrapper">
          <form className="search-wrapper" onSubmit={this.submitSearch}>
            <input
              id="search-input"
              type="input"
              placeholder={SEARCH_PLACEHOLDER}
              onChange={this.input}
            />
            <input type="submit" className="search-submit" value="Search" />
          </form>
          <ErrorButton />
          <div className="characters-flex">
            {!this.state.loading &&
              this.state.characters.map((x: Character) => (
                <div key={x.name} className="character-item">
                  <span>Name: {x.name}</span>
                  <span>Gender: {x.gender}</span>
                  <span>Birth year: {x.birth_year}</span>
                  <span>Height: {x.height}</span>
                  <span>Mass: {x.mass}</span>
                  <span>Eye color: {x.eye_color}</span>
                </div>
              ))}
            {this.state.loading && <span>{LOADING_DATA}</span>}
            {!this.state.characters.length && !this.state.loading && (
              <span>{EMPTY_DATA}</span>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MainPage;
