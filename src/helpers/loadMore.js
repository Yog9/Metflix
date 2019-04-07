export const loadMore = (movietype) => {
    this.setState({
        page: this.state.page + 1
    })
    console.log(movietype);
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