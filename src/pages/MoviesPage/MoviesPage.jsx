import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovie } from "../../HTTP-requests.js";
import { toast } from "react-toastify";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [requestMovie, setRequestMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(searchParams.get("query"));

  const handleSubmit = (searchQuery) => {
    setSearchParams({ query: searchQuery });
  };

  const NotFound = () => {
    toast("There are no movies from this search", {
      position: "top-right",
      autoClose: 2500,
    });
  };

  useEffect(() => {
    if (!searchParams.get("query")) {
      return;
    }
    async function searchMovies() {
      try {
        setIsLoading(true);
        const searching = await getSearchMovie(searchParams.get("query"));
        if (searching.length === 0) {
          NotFound();
        }
        setRequestMovie(searching);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    console.log(searchParams.get("query"));

    searchMovies();
  }, [searchParams]);

  console.log(requestMovie);

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />

      {requestMovie.length > 0 && <MovieList movies={requestMovie} />}
      {isLoading && <Loader />}
      {error && <p>Please restart the page</p>}
    </div>
  );
}
