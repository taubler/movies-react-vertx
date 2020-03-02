import React, { Component } from "react";
import './MovieForm.css'

//new
var xhr;

class MovieForm extends Component {

	constructor(props) {
		super(props);
		this.state = { title: '', genre: 'comedy' };

	    this.handleChangeTitle = this.handleChangeTitle.bind(this);
	    this.handleChangeGenre = this.handleChangeGenre.bind(this);
	    this.changeState = this.changeState.bind(this);
	    this.toGenreOption = this.toGenreOption.bind(this);
	    //new
	    this.tryCreateMovie = this.tryCreateMovie.bind(this);
	    this.processRequest = this.processRequest.bind(this);
	    //end new
	}

	handleChangeTitle(event) {
		this.changeState( { title: event.target.value } )
	}

	handleChangeGenre(event) {
		this.changeState( { genre: event.target.value } )
	}

	changeState(keyVal) {
		this.setState( Object.assign({}, this.state, keyVal) )
	}
	
	//new

	tryCreateMovie() {
		xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost/movies")
		xhr.send(JSON.stringify({ "title": this.state.title, "genre": this.state.genre }));
		xhr.addEventListener("readystatechange", this.processRequest, false);
	}

	processRequest() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			this.props.eventDispatcher.dispatch("addMovie", "")
			this.changeState( { title: "" } )
		}
	}
	
	//end new

	toGenreOption(g) {
		return (<option key={g.value} value={g.value}>{g.label}</option>)
	}

	render() {
		return (
			<>
			<form className="movie-form">
				<span className="movie-form-element">
					<label>Title&nbsp;
					<input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
					</label>
				</span>
				<span className="movie-form-element">
					<label>Genre&nbsp;
					<select value={this.state.genre} onChange={this.handleChangeGenre}>
					{this.props.genres.map(this.toGenreOption)}
					</select>
					</label>
				</span>
				<span className="movie-form-element">
					<input type="button" value="Submit" onClick={this.tryCreateMovie} />
				</span>
			</form>
			</>
		)
	}

}

export default MovieForm;