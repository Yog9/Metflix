import React, { Component } from 'react'
import MovieItem from './MovieItem';

export default class MovieContainer extends Component {
    render() {
        let movie = this.props.movies.map((movie_item, index) =>
            <MovieItem vote={movie_item.vote_average}
                path={movie_item.poster_path}
                title={movie_item.title}
                key={index}
                id={movie_item.id}
                movie_type={this.props.movie_type}
            />
        )
        return (
            <React.Fragment>
                <div className="list-container">
                    {movie}
                </div>

            </React.Fragment>
        )
    }
}
