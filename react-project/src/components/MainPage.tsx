import React from 'react';
import SearchSection from './SearchSection';
import MoviesSection from './MoviesSection';
import './MainPage.css';

class MainPage extends React.Component {
  search: SearchSection;
  movies: MoviesSection;

  constructor(props: object) {
    super(props);
    this.search = new SearchSection(props);
    this.movies = new MoviesSection(props);
  }

  render() {
    return (
      <>
        <div className="main-wrapper">
          {this.search.render()}
          {this.movies.render()}
        </div>
      </>
    );
  }
}

export default MainPage;
