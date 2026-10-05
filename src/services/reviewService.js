import { getToken } from '../lib/helpers/jwt-helpers';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getReviews = async () => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load reviews');
  }

  return data;
};

const getReview = async (reviewId) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load review');
  }

  return data;
};

const createReview = async (reviewData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to create review');
  }

  return data;
};

const updateReview = async (reviewId, reviewData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to update review');
  }

  return data;
};

const deleteReview = async (reviewId) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.detail || 'Unable to delete review');
  }
};

export {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};