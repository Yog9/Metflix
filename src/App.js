import React, { Component } from 'react';
import Header from './components/Header';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/Movies';
import { getMovies } from './helpers/getMovies'
import { loadMore } from './helpers/loadMore'
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

    getMovies('discover', 'discovermovies', 1);
    getMovies('popular', 'popularmovies', 1);
    getMovies('top_rated', 'top_ratedmovies', 1);
    getMovies('upcoming', 'coming_soonmovies', 1);
  }

  loadMore(popular);
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
