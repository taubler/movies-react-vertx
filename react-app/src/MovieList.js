import React, { Component } from "react";
import './MovieList.css'

//new
var xhr;

class MovieList extends Component {

	constructor(props) {
		super(props);
	    this.toMovie = this.toMovie.bind(this);
	    //new
		this.state = {
			movies: []
		}
		this.sendRequest = this.sendRequest.bind(this);
		this.processRequest = this.processRequest.bind(this);
		this.props.eventDispatcher.subscribe("addMovie", this.sendRequest);
	    //end new
	}
	
	// new
	componentDidMount() {
		this.sendRequest()
	}

	sendRequest() {
		let url = process.env.REACT_APP_SERVER_URL || "http://localhost";
		console.log("Will request movies from " + url)
		xhr = new XMLHttpRequest();
		xhr.open("GET", url + "/movies")
		xhr.send();
		xhr.addEventListener("readystatechange", this.processRequest, false);
	}

	processRequest() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log(xhr.responseText)
			var response = JSON.parse(xhr.responseText);
			//also new is that in render(), this.props.movies becomes this.state.movies
			this.setState({
				movies: response
			})
		}
	}
	// end new
	
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
				{this.state.movies.map(this.toMovie)}
			</table>
		)
	}

}

export default MovieList;