import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getDetailsMovie } from "../../HTTP-requests.js";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const navLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkURL = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function detailsMovies() {
      try {
        setIsLoading(true);
        const Movie = await getDetailsMovie(movieId);
        setDetails(Movie);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    detailsMovies();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}

      <ul>
        <li>
          <NavLink to={backLinkURL.current} className={navLinkClass}>
            Go back
          </NavLink>
        </li>
      </ul>

      {details && (
        <div className={css.conainer}>
          <img
            className={css.poster}
            src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
            alt="movie poster"
          />
          <div>
            <h2>
              {details.title}(
              {details.release_date.slice(0, details.release_date.indexOf("-"))}
              )
            </h2>
            <p>User score: {Math.round(details.vote_average * 10)}%</p>
            <b>Owerview</b>
            <p>{details.overview}</p>
            <b>Genres</b>
            <p>{details.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      )}

      <ul className={css.listLink}>
        <li>
          <NavLink to="cast" className={navLinkClass}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={navLinkClass}>
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<div>Please waite loading page...</div>}>
        <Outlet />
      </Suspense>
      {error && <p>Please restart the page</p>}
    </div>
  );
}
