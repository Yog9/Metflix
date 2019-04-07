import React, { Component } from 'react';
import Header from './components/Header';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/Movies';

import Sidebar from './components/Sidebar';
const APIURL = 'https://api.themoviedb.org/3/movie/';
const APIKEY = '2afba9f9458a7c12ebe9718f62d54bf5';

class App extends Component {
  state = {
    popularmovies: [],
    coming_soonmovies: [],
    discovermovies: [],
    top_ratedmovies: [],
    page: 1
  }
  componentDidMount() {

    this.getMovies('discover', 'discovermovies', 1);
    this.getMovies('popular', 'popularmovies', 1);
    this.getMovies('top_rated', 'top_ratedmovies', 1);
    this.getMovies('upcoming', 'coming_soonmovies', 1);
  }
  getMovies = (movietype, movies, page = this.state.page) => {
    axios.get(`${APIURL}${movietype}?api_key=${APIKEY}&language=en-US&page=${page}`)
      .then((response) => {
        console.log(response.data.results);
        this.setState({
          [movies]: response.data.results,

        });
        console.log(this.state);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }
  loadMore = (movietype) => {
    this.setState({
      page: this.state.page + 1
    })
    if (movietype === 'Popular') {
      axios.get(`${APIURL}popular?api_key=${APIKEY}&language=en-US&page=${this.state.page}`)
        .then((response) => {
          console.log(response.data.results);
          this.setState({
            popularmovies: [...this.state.popularmovies, response.data.results],
          });
          console.log(this.state);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
    if (movietype === 'Discover') {
      axios.get(`${APIURL}discover?api_key=${APIKEY}&language=en-US&page=${this.state.page}`)
        .then((response) => {
          console.log(response.data.results);
          this.setState({
            discovermovies: [...this.state.discovermovies, response.data.results],
          });
          console.log(this.state);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
    if (movietype === 'Top Rated') {
      axios.get(`${APIURL}top_rated?api_key=${APIKEY}&language=en-US&page=${this.state.page}`)
        .then((response) => {
          console.log(response.data.results);
          this.setState({
            top_ratedmovies: [...this.state.top_ratedmovies, response.data.results],
          });
          console.log(this.state);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
    if (movietype === 'Coming Soon') {
      axios.get(`${APIURL}coming_soon?api_key=${APIKEY}&language=en-US&page=${this.state.page}`)
        .then((response) => {
          console.log(response.data.results);
          this.setState({
            coming_soonmovies: [...this.state.coming_soonmovies, response.data.results],
          });
          console.log(this.state);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <div>
              <Header />
              <div className="App-main">
                <Sidebar />
                <Route exact path="/" component={() => <Redirect to="/discover" />} />
                <Route path="/discover" component={() => <Movies movies={this.state.discovermovies} movie_type="Discover" load_more={this.loadMore} />} />
                <Route path="/top_rated" component={() => <Movies movies={this.state.top_ratedmovies} movie_type="Top Rated" load_more={this.loadMore} />} />
                <Route path="/popular" component={() => <Movies movies={this.state.popularmovies} movie_type="Popular" load_more={() => this.loadMore} />} />
                <Route path="/coming_soon" component={() => <Movies movies={this.state.coming_soonmovies} movie_type="Coming Soon" load_more={this.loadMore} />} />
              </div>
            </div>
          </Switch>
        </Router>

      </React.Fragment>
    );
  }
}

export default App;
