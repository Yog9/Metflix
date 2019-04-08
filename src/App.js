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
    upcomingmovies: [],
    top_ratedmovies: [],
    now_playingmovies: [],
    page: 1,

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



  componentDidMount() {

    this.getMovies('now_playing', 'now_playingmovies', 1);
    this.getMovies('popular', 'popularmovies', 1);
    this.getMovies('top_rated', 'top_ratedmovies', 1);
    this.getMovies('upcoming', 'upcomingmovies', 1);
  }

  loadMore = (movietype) => {
    let count = 1;
    this.setState({
      page: this.state.page + 1
    });
    console.log(`This is load more clicked ${count} times in ${movietype} section and page is ${this.state.page}`);

    if (movietype === 'Now Playing') {
      axios.get(`${APIURL}now_playing?api_key=${APIKEY}&language=en-US&page=${this.state.page}`)
        .then((response) => {
          console.log(`Extra res array of discover ${response.data.results}`);
          this.setState({
            discovermovies: [...this.state.now_playingmovies, response.data.results],
          });
          console.log(`Length of discover movies is ${this.state.now_playingmovies}`);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }

    if (movietype === 'Popular') {
      console.log(`Length of popular movies is  before api ${this.state.popularmovies}`);
      axios.get(`${APIURL}popular?api_key=${APIKEY}&language=en-US&page=${this.state.page}`)
        .then((response) => {
          console.log(`Extra res array of popular ${response.data.results}`);
          this.setState({
            popularmovies: [...this.state.popularmovies, response.data.results],
          });
          console.log(`Length of popular movies is  after api ${this.state.popularmovies}`);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }

    if (movietype === 'Top Rated') {
      axios.get(`${APIURL}top_rated?api_key=${APIKEY}&language=en-US&page=${this.state.page}`)
        .then((response) => {
          console.log(`Extra res array of toprated ${response.data.results}`);
          this.setState({
            top_ratedmovies: [...this.state.top_ratedmovies, response.data.results],
          });
          console.log(`Length of top rated movies is ${this.state.top_ratedmovies}`);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
    if (movietype === 'Upcoming') {
      axios.get(`${APIURL}upcoming?api_key=${APIKEY}&language=en-US&page=${this.state.page}`)
        .then((response) => {
          console.log(`Extra res array of coming soon  ${response.data.results}`);
          this.setState({
            coming_soonmovies: [...this.state.upcomingmovies, response.data.results],
          });
          console.log(`Length of coming soon movies is ${this.state.upcomingmovies}`);
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
                <Route exact path="/" component={() => <Redirect to="/now_playing" />} />
                <Route path="/now_playing" component={() => <Movies movies={this.state.now_playingmovies}
                  movie_type="Now Playing"
                  loadMore={this.loadMore} />} />
                <Route path="/top_rated" component={() => <Movies movies={this.state.top_ratedmovies}
                  movie_type="Top Rated"
                  loadMore={this.loadMore} />} />
                <Route path="/popular" component={() => <Movies movies={this.state.popularmovies}
                  movie_type="Popular"
                  loadMore={() => this.loadMore} />} />
                <Route path="/upcoming" component={() => <Movies movies={this.state.upcomingmovies}
                  movie_type="Upcoming"
                  loadMore={this.loadMore} />} />
              </div>
            </div>
          </Switch>
        </Router>

      </React.Fragment>
    );
  }
}

export default App;
