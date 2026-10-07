import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

import {
  deleteReview,
  getReviews,
} from '../../services/reviewService';

import './Reviews.css';

const Reviews = () => {
  const { user } = useContext(UserContext);

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
    <main className="reviews-page">
      <section className="reviews-header">
        <p className="reviews-label">
          BUNYAN Community
        </p>

        <h1>
          {user?.role === 'admin'
            ? 'Reviews'
            : user?.role === 'client'
              ? 'My Reviews'
              : 'My Feedback'}
        </h1>

        <p>
          {user?.role === 'admin'
            ? 'View and manage feedback shared across BUNYAN.'
            : user?.role === 'client'
              ? 'View the feedback you have shared with professionals on BUNYAN.'
              : 'View feedback shared by clients about your work on BUNYAN.'}
        </p>
      </section>

      {message && (
        <p className="reviews-message">
          {message}
        </p>
      )}

      {reviews.length === 0 ? (
        <section className="reviews-empty">
          <div className="reviews-empty-number">
            01
          </div>

          <h2>No reviews yet</h2>

          <p>
            Reviews you create will appear here.
          </p>
        </section>
      ) : (
        <section className="reviews-grid">
          {reviews.map((review, index) => (
            <article
              key={review.id}
              className="review-card"
            >
              <div className="review-card-top">
                <span className="review-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="review-rating">
                  {review.rating}/5
                </span>
              </div>

              <div className="review-card-content">
                <p className="review-card-label">
                  Your Feedback
                </p>

                <h2>
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </h2>

                <p className="review-comment">
                  {review.comment || 'No comment provided.'}
                </p>

                <div className="review-user">
                  <span>Reviewed User</span>
                  <strong>
                    User #{review.reviewed_user_id}
                  </strong>
                </div>
              </div>

              {user?.role === 'admin' && (
                <div className="review-card-actions">
                  <button
                    type="button"
                    className="review-delete-button"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Reviews;
