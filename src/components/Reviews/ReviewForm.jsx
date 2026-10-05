import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { createReview } from '../../services/reviewService';

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
    <main>
      <h1>Leave a Review</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
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

        <div>
          <label htmlFor="comment">
            Comment
          </label>

          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Submit Review
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </main>
  );
};

export default ReviewForm;