import React, { Component } from 'react';
import axios from 'axios';
import Cast from './Cast';
import { APIKEY, APIURL } from '../api/config';
import SimilarMoviesContainer from './SimilarMoviesContainer';

export default class MovieDetail extends Component {
  state = {
    movie_detail: '',
    cast_array: [],
    similar_movies_array: [],
  };
  apiCall = (id) => {
    axios
      .get(`${APIURL}${id}?api_key=${APIKEY}&language=en-US`)
      .then((response) => {
        this.setState({
          movie_detail: response.data,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    axios
      .get(`${APIURL}${id}/casts?api_key=${APIKEY}`)
      .then((response) => {
        this.setState({
          cast_array: response.data.cast.slice(0, 9),
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    axios
      .get(`${APIURL}${id}/similar?api_key=${APIKEY}&language=en-US&page=1`)
      .then((response) => {
        this.setState({
          similar_movies_array: response.data.results.slice(0, 9),
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  componentDidMount() {
    let id = this.props.match.params.id;
    this.apiCall(id);
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const newId = prevProps.match.params.id;
      this.apiCall(newId);
    }
  }
  movieBackdropStyles = {
    //backgroundImage: `url(https://image.tmdb.org/t/p/w1280${this.state.movie_detail.backdrop_path})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };
  render() {
    return (
      <div>
        <div className="App-content-wrapper">
          <div className="Movie-wrapper">
            <img
              className="movie-backdrop"
              src={`https://image.tmdb.org/t/p/w1280${this.state.movie_detail.backdrop_path}`}
              alt="img"
              style={this.movieBackdropStyles}
            />

            <div className="movie-content">
              <div>
                <img
                  className="movie-poster"
                  src={`https://image.tmdb.org/t/p/w500${this.state.movie_detail.poster_path}`}
                  alt={`${this.state.movie_detail.original_title}`}
                />
              </div>
              <div className="movie-data">
                <h1 className="movie-title">{this.state.movie_detail.title}</h1>
                <div className="movie-actions">
                  <div className="movie-actions__item">
                    <span className="movie-action-circle">
                      <a href="/login">
                        <svg
                          className="movie__action action__favorite"
                          viewBox="0 0 13 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.903 3.583C12.713 1.507 11.245 0 9.405 0 8.18 0 7.058.66 6.427 1.717 5.8.647 4.725 0 3.52 0 1.68 0 .21 1.507.02 3.583c-.015.092-.076.574.11 1.362.267 1.135.886 2.168 1.79 2.986l4.502 4.087 4.58-4.086c.902-.817 1.52-1.85 1.79-2.985.185-.787.124-1.27.11-1.362z"></path>
                        </svg>
                      </a>
                    </span>
                  </div>
                  <div className="movie-actions__item">
                    <span className="movie-action-circle">
                      <svg
                        width="10"
                        height="15"
                        className="movie__action action__playtrailer"
                        viewBox="0 0 10 15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M.013.135L9.7 7.5.012 14.865"></path>
                      </svg>
                    </span>
                  </div>
                  <div className="movie-actions__item">
                    <span className="movie-action-circle">
                      <a href="/login">
                        <svg
                          className="movie__action action__watchlater"
                          viewBox="0 0 15 15"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.52.1C3.44.1.14 3.4.14 7.5c0 4.06 3.3 7.37 7.38 7.37s7.38-3.3 7.38-7.4C14.9 3.42 11.6.1 7.52.1zm3.26 9.52c-.12.18-.36.24-.55.12l-2.95-1.9-.05-.03H7.2l-.02-.04-.02-.03-.02-.03-.02-.03v-.04-.08-.05l.02-4.8c0-.23.18-.4.4-.4.2 0 .37.17.38.38l-.02 4.6 2.76 1.78c.2.12.24.37.12.55v.02z"></path>
                        </svg>
                      </a>
                    </span>
                  </div>
                </div>
                <h3 className="movie-overview-title">Overview</h3>
                <p className="movie-overview">
                  {this.state.movie_detail.overview}
                </p>
              </div>
            </div>
            <h1 className="movie-title">Cast</h1>
            <Cast
              id={this.state.movie_detail.id}
              cast_array={this.state.cast_array}
            />
            <h1 className="movie-title">Similar Movies</h1>

            <SimilarMoviesContainer
              id={this.state.movie_detail.id}
              similar_movies_array={this.state.similar_movies_array}
            />
          </div>
        </div>
      </div>
    );
  }
}
