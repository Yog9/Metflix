export const getMovies = (movietype, movies, page = this.state.page) => {
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
