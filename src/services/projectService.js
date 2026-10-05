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

const getProject = async (projectId) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load project');
  }

  return data;
};

const createProject = async (projectData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to create project');
  }

  return data;
};

export {
  getProjects,
  getProject,
  createProject,
};