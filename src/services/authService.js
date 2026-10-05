import {
  parseToken,
  registerToken,
} from '../lib/helpers/jwt-helpers';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;


const getUser = async (token) => {
  const payload = parseToken(token);
  const userId = payload.sub;

  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to get user');
  }

  return data;
};


const signUp = async (formData) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Sign up failed');
  }

  registerToken(data.token);

  return getUser(data.token);
};


const signIn = async (formData) => {
  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Sign in failed');
  }

  registerToken(data.token);

  return getUser(data.token);
};


export {
  signUp,
  signIn,
};