import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import {
  deleteReview,
  getReviews,
} from '../../services/reviewService';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  const loadReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this review?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteReview(reviewId);
      await loadReviews();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>My Reviews</h1>

      {message && <p>{message}</p>}

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div>
          {reviews.map((review) => (
            <div key={review.id}>
              <h2>Rating: {review.rating}/5</h2>

              <p>{review.comment || 'No comment'}</p>

              <p>
                Reviewed User ID: {review.reviewed_user_id}
              </p>

              <Link to={`/reviews/${review.id}/edit`}>
                Edit Review
              </Link>

              <br />

              <button
                type="button"
                onClick={() => handleDelete(review.id)}
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Reviews;