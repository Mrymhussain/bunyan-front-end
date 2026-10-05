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
    const res = await fetch(`${BASE_URL}/users/${payload.sub}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      removeToken();
      return null;
    }

    return await res.json();
  } catch {
    return null;
  }
};

const currentUser = getCurrentUser;

export {
  getCurrentUser,
  currentUser,
};