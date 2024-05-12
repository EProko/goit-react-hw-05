import { useEffect, useState } from "react";
import { getTrendMovies } from "../../HTTP-requests.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        const trendMovies = await getTrendMovies();
        setMovies(trendMovies);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <h1>Tranding movies</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
