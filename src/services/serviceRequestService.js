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

const getServiceRequest = async (requestId) => {
  const token = getToken();

  const res = await fetch(
    `${BASE_URL}/service-requests/${requestId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load service request');
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

const updateServiceRequest = async (requestId, requestData) => {
  const token = getToken();

  const res = await fetch(
    `${BASE_URL}/service-requests/${requestId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to update service request');
  }

  return data;
};

const deleteServiceRequest = async (requestId) => {
  const token = getToken();

  const res = await fetch(
    `${BASE_URL}/service-requests/${requestId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.detail || 'Unable to delete service request');
  }
};

export {
  getServiceRequests,
  getServiceRequest,
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
};