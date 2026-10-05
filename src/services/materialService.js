import { getToken } from '../lib/helpers/jwt-helpers';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getMaterials = async () => {
  const res = await fetch(`${BASE_URL}/materials`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load materials');
  }

  return data;
};

const getMaterial = async (materialId) => {
  const res = await fetch(`${BASE_URL}/materials/${materialId}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load material');
  }

  return data;
};

const createMaterial = async (materialData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/materials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(materialData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to create material');
  }

  return data;
};

const updateMaterial = async (materialId, materialData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/materials/${materialId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(materialData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to update material');
  }

  return data;
};

const deleteMaterial = async (materialId) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/materials/${materialId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.detail || 'Unable to delete material');
  }
};

export {
  getMaterials,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};