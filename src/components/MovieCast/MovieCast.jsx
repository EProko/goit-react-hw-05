import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCreditsMovie } from "../../HTTP-requests.js";
import Loader from "../Loader/Loader.jsx";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [credits, setCredits] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function creditsMovies() {
      try {
        setIsLoading(true);
        const cast = await getCreditsMovie(movieId);
        setCredits(cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    creditsMovies();
  }, [movieId]);

  return (
    <div>
      {credits && (
        <ul className={css.list}>
          {credits.map((credit) => (
            <li className={css.item} key={credit.cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
                alt="actor photo"
              />
              <h4>{credit.name}</h4>
              <p>Character - {credit.character}</p>
            </li>
          ))}
        </ul>
      )}
      {isLoading && <Loader />}
    </div>
  );
}
