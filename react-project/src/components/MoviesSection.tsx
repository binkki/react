import React from 'react';

type Movie = {
  title: string;
  desctiption: string;
};

class MoviesSection extends React.Component {
  movies: Movie[];

  constructor(props: {}) {
    super(props);
    this.movies = [
      {
        title: 'Title 1',
        desctiption: 'Description 1',
      },
      {
        title: 'Title 2',
        desctiption: 'Description 2',
      },
      {
        title: 'Title 3',
        desctiption: 'Description 3',
      },
      {
        title: 'Title 4',
        desctiption: 'Description 4',
      },
      {
        title: 'Title 5',
        desctiption: 'Description 5',
      },
      {
        title: 'Title 6',
        desctiption: 'Description 6',
      },
    ];
  }

  render() {
    return (
      <>
        <div className="movies-flex">
          {this.movies.map((x: Movie) => (
            <div key={x.title} className="movies-item">
              <p className="movie-title">{x.title}</p>
              <span className="movie-description">{x.desctiption}</span>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default MoviesSection;
