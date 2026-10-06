import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getReview,
  updateReview,
} from '../../services/reviewService';

import './ReviewForm.css';

const EditReview = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    const loadReview = async () => {
      try {
        const review = await getReview(reviewId);

        setFormData({
          rating: review.rating,
          comment: review.comment || '',
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadReview();
  }, [reviewId]);

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
      await updateReview(reviewId, {
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
          Manage Feedback
        </p>

        <h1>Edit Review</h1>

        <p>
          Update your rating or feedback for this BUNYAN professional.
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
              placeholder="Update your feedback..."
              rows="6"
            />
          </div>

          <div className="review-form-actions">
            <button
              type="submit"
              className="review-form-submit"
            >
              Save Changes
              <span>→</span>
            </button>

            <button
              type="button"
              className="review-form-cancel"
              onClick={() => navigate('/reviews')}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditReview;
