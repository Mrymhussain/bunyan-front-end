import { getToken } from '../lib/helpers/jwt-helpers';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getProjects = async () => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load projects');
  }

  return data;
};

export {
  getProjects,
};