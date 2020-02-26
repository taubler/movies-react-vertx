import React, { Component } from "react";
import './MovieList.css'

class MovieList extends Component {

	constructor(props) {
		super(props);
	    this.toMovie = this.toMovie.bind(this);
	    this.genreLabel = this.genreLabel.bind(this);
	}
	
	genreLabel(g) {
		return "?";
	}
	
	toMovie(m) {
		var g = "?";
		for (var i = 0; i < this.props.genres.length; i++) { 
    		if (this.props.genres[i].value == m.genre) {
    			g = this.props.genres[i].label;
    			break;
    		}
		} 
		return (<tbody key={m.guid}><tr><td>{m.title}</td><td>{g}</td></tr></tbody>)
	}

	render() {
		return (
			<table className="movie-list" >
				<tbody>
				<tr>
					<th>Name</th>
					<th>Genre</th>
				</tr>
				</tbody>
				{this.props.movies.map(this.toMovie)}
			</table>
		)
	}

}

export default MovieList;