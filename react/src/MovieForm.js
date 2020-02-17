import React, { Component } from "react";
import './MovieForm.css'

class MovieForm extends Component {

	constructor(props) {
		super(props);
		this.state = { title: '', genre: 'comedy' };

	    this.handleChangeTitle = this.handleChangeTitle.bind(this);
	    this.handleChangeGenre = this.handleChangeGenre.bind(this);
	    this.changeState = this.changeState.bind(this);
	    this.toGenreOption = this.toGenreOption.bind(this);
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

	toGenreOption(g) {
		return (<option value={g.value}>{g.label}</option>)
	}

	render() {
		return (
			<>
			<form className="movie-form" onSubmit={this.tryCreateMovie}>
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
					<input type="submit" value="Submit" />
				</span>
			</form>
			</>
		)
	}

}

export default MovieForm;