import { getToken } from '../lib/helpers/jwt-helpers';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getOrders = async () => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load orders');
  }

  return data;
};

const getOrder = async (orderId) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load order');
  }

  return data;
};

const createOrder = async (orderData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to create order');
  }

  return data;
};

const updateOrder = async (orderId, orderData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to update order');
  }

  return data;
};

const deleteOrder = async (orderId) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.detail || 'Unable to delete order');
  }
};

const getOrderItems = async (orderId) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/orders/${orderId}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load order items');
  }

  return data;
};

const addOrderItem = async (orderId, itemData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/orders/${orderId}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(itemData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to add order item');
  }

  return data;
};

const deleteOrderItem = async (orderId, itemId) => {
  const token = getToken();

  const res = await fetch(
    `${BASE_URL}/orders/${orderId}/items/${itemId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.detail || 'Unable to delete order item');
  }
};

export {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderItems,
  addOrderItem,
  deleteOrderItem,
};