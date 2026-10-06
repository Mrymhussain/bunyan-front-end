import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { createReview } from '../../services/reviewService';

import './ReviewForm.css';

const ReviewForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
  });

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await createReview({
        reviewed_user_id: Number(userId),
        rating: Number(formData.rating),
        comment: formData.comment,
      });

      navigate('/reviews');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="review-form-page">
      <section className="review-form-header">
        <p className="review-form-label">
          Share Your Experience
        </p>

        <h1>Leave a Review</h1>

        <p>
          Share your feedback about your experience
          with this BUNYAN professional.
        </p>
      </section>

      <section className="review-form-card">
        {message && (
          <p className="review-form-message">
            {message}
          </p>
        )}

        <form
          className="review-form"
          onSubmit={handleSubmit}
        >
          <div className="review-form-field">
            <label htmlFor="rating">
              Rating
            </label>

            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>

          <div className="review-form-field">
            <label htmlFor="comment">
              Comment
            </label>

            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Tell us about your experience..."
              rows="6"
            />
          </div>

          <div className="review-form-actions">
            <button
              type="submit"
              className="review-form-submit"
            >
              Submit Review
              <span>→</span>
            </button>

            <button
              type="button"
              className="review-form-cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ReviewForm;
