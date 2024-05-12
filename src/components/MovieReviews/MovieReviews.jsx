import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsMovie } from "../../HTTP-requests.js";
import Loader from "../Loader/Loader.jsx";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function reviewsMovies() {
      try {
        setIsLoading(true);
        const data = await getReviewsMovie(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    reviewsMovies();
  }, [movieId]);

  return (
    <div>
      {reviews && (
        <ul>
          {reviews.map((review) => (
            <li className={css.Item} key={review.id}>
              <b>Author: {review.author}</b>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews && reviews.length === 0 && (
        <p>Sorry, there are no reviews for this movie yet</p>
      )}
      {isLoading && <Loader />}
    </div>
  );
}
