import { getToken } from '../lib/helpers/jwt-helpers';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getConsultations = async () => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/consultations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load consultations');
  }

  return data;
};

const getConsultation = async (consultationId) => {
  const token = getToken();

  const res = await fetch(
    `${BASE_URL}/consultations/${consultationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load consultation');
  }

  return data;
};

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

const updateConsultation = async (
  consultationId,
  consultationData
) => {
  const token = getToken();

  const res = await fetch(
    `${BASE_URL}/consultations/${consultationId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(consultationData),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to update consultation');
  }

  return data;
};

const deleteConsultation = async (consultationId) => {
  const token = getToken();

  const res = await fetch(
    `${BASE_URL}/consultations/${consultationId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.detail || 'Unable to delete consultation');
  }
};

export {
  getConsultations,
  getConsultation,
  createConsultation,
  updateConsultation,
  deleteConsultation,
};