import React, { Component } from 'react'
import MovieContainer from './MovieContainer';

export default class Movies extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="App-content-wrapper">
                    <div className="Main-wrapper">
                        <h1 className="App-main-title">
                            {this.props.movie_type}</h1>
                        <MovieContainer movies={this.props.movies} movie_type={this.props.movie_type} loadMore={this.props.loadMore} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
