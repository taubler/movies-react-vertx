import React from 'react';
import logo from './logo.svg';
import './App.css';
import MovieForm from "./MovieForm"
import MovieList from "./MovieList"

const genres = [ 
  {value: 'action', label: 'Action'}, 
  {value: 'comedy', label: 'Comedy'}, 
  {value: 'drama', label: 'Drama'}, 
  {value: 'thriller', label: 'Thriller'}, 
  {value: 'musical', label: 'Musical'} 
]

const movies = [ 
  {genre: 'action', title: 'Captain Marvel'}, 
  {genre: 'action', title: 'V'}, 
  {genre: 'action', title: 'Midway'}, 
  {genre: 'comedy', title: 'Groundhog Day'}, 
  {genre: 'thriller', title: 'Scream'} 
]

function App() {
  return (
    <div className="App">
        <h1>
          Movies
        </h1>
      <div>
        <MovieForm genres={genres} />
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
