import React, { Component } from 'react';
import Header from './components/Header';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/Movies';
import MovieDetail from './components/MovieDetail';
import Sidebar from './components/Sidebar';
import Loading from './components/Loading';
import { APIKEY, APIURL } from './api/config';

class App extends Component {
  state = {
    popularmovies: [],
    upcomingmovies: [],
    top_ratedmovies: [],
    now_playingmovies: [],
    page: 1,
    /*searchmovies: [],*/


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
  /*handleSearch = (query) => {
    // Initial state
    this.setState({
      query: query

    });
    // If there is a query, fetch the data from TMDB
    if (query) {
      axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${APIKEY}&page=1`)
        .then(response => {
          this.setState({
            searchmovies: response.data.results
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }*/


  componentDidMount() {

    this.getMovies('now_playing', 'now_playingmovies', 1);

    this.getMovies('popular', 'popularmovies', 1);

    this.getMovies('top_rated', 'top_ratedmovies', 1);



    this.getMovies('upcoming', 'upcomingmovies', 1);

  }


  render() {
    return (
      <React.Fragment>
        <Router>

          <div>
            <Header search={this.handleSearch} />
            <div className="App-main">
              <Sidebar />
              <Switch>
                <Route exact path="/" component={() => <Redirect to="/now_playing" />} />
                <Route path="/now_playing" component={() => <Movies movies={this.state.now_playingmovies}
                  movie_type="Now Playing"
                />} />
                <Route path="/top_rated" component={() => <Movies movies={this.state.top_ratedmovies}
                  movie_type="Top Rated"
                />} />
                <Route path="/popular" component={() => <Movies movies={this.state.popularmovies}
                  movie_type="Popular"
                />} />
                <Route path="/upcoming" component={() => <Movies movies={this.state.upcomingmovies}
                  movie_type="Upcoming"
                />} />
                <Route path="/movie_detail/:id" component={MovieDetail} />
                {/* <Route path="/search"
                  component={() => <Movies movies={this.state.searchmovies} handleSearch={this.handleSearch} />} />*/}
              </Switch>
            </div>
          </div>

        </Router>

      </React.Fragment>
    );
  }
}

export default App;
