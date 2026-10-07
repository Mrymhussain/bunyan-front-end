import {
  getToken,
  parseToken,
  removeToken,
} from '../lib/helpers/jwt-helpers';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getCurrentUser = async () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  const payload = parseToken(token);

  if (!payload || !payload.sub) {
    removeToken();
    return null;
  }

  try {
    const res = await fetch(
      `${BASE_URL}/users/${payload.sub}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      removeToken();
      return null;
    }

    return await res.json();
  } catch {
    return null;
  }
};

const updateUser = async (userId, userData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to update profile');
  }

  return data;
};


const getUsers = async () => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load users');
  }

  return data;
};

const currentUser = getCurrentUser;

export {
  getCurrentUser,
  currentUser,
  updateUser,
  getUsers,
};