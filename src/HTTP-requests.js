import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const AUTH_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjMxMTMwMDY2YzZhZTYyYjZlZjBhOTM1NzY5NzEzMSIsInN1YiI6IjY2M2ZkYzVjNWUyYzQwYzkzZjkwOTAwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7b05yQvqImRZkda0tOBlUD1IuByhxfl6-2YYgd6rvlg";

const options = {
  headers: {
    Authorization: `Bearer ${AUTH_KEY}`,
  },
};

export async function getTrendMovies() {
  const response = await axios.get(
    "trending/movie/day?language=en-US",
    options
  );

  return response.data.results;
}

export async function getDetailsMovie(movieId) {
  const response = await axios.get(`/movie/${movieId}?language=en-US`, options);

  return response.data;
}

export async function getCreditsMovie(movieId) {
  const response = await axios.get(
    `/movie/${movieId}/credits?language=en-US`,
    options
  );

  return response.data.cast;
}

export async function getReviewsMovie(movieId) {
  const response = await axios.get(
    `/movie/${movieId}/reviews?language=en-US`,
    options
  );

  return response.data.results;
}

export async function getSearchMovie(query) {
  const response = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );

  return response.data.results;
}
