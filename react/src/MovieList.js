import React, { Component } from "react";
import './MovieList.css'

class MovieList extends Component {

	constructor(props) {
		super(props);
		this.state = { title: '', genre: 'comedy' };

	    this.toMovie = this.toMovie.bind(this);
	}
	toMovie(m) {
		return (<tr><td>{m.title}</td><td>{m.genre}</td></tr>)
	}

	render() {
		return (
			<table className="movie-list" >
				<tr>
					<th>Name</th>
					<th>Genre</th>
				</tr>

				{this.props.movies.map(this.toMovie)}
			</table>
		)
	}

}

export default MovieList;