import { getToken } from '../lib/helpers/jwt-helpers';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getServiceRequests = async () => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/service-requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load service requests');
  }

  return data;
};

const createServiceRequest = async (requestData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/service-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to create service request');
  }

  return data;
};

export {
  getServiceRequests,
  createServiceRequest,
};