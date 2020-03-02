import React from 'react';
import './App.css';
import MovieList from "./MovieList"
import MovieForm from "./MovieForm"

const genres = [ 
  {value: 'action', label: 'Action'}, 
  {value: 'comedy', label: 'Comedy'}, 
  {value: 'drama', label: 'Drama'}, 
  {value: 'thriller', label: 'Thriller'}, 
  {value: 'musical', label: 'Musical'} 
]

const eventDispatcher = {
	listeners: {},
	dispatch: function(event, data) {
		if (this.listeners[event]) {
			this.listeners[event].forEach(function(l) {
				l(data);
			});
		}
	},
	subscribe: function(event, f) {
		if (!this.listeners[event]) this.listeners[event] = [];
		this.listeners[event].push(f)
	}
}

function App() {
  return (
    <div className="App">
      <h1>
          Movies
      </h1>
      <div>
        <MovieForm genres={genres} eventDispatcher={eventDispatcher} />
        <MovieList genres={genres} eventDispatcher={eventDispatcher} />
      </div>
    </div>
  );
}

export default App;
