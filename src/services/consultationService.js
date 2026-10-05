import { getToken } from '../lib/helpers/jwt-helpers';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const createConsultation = async (consultationData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/consultations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(consultationData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to create consultation');
  }

  return data;
};

export {
  createConsultation,
};