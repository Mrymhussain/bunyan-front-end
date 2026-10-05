const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getServiceCategories = async () => {
  const res = await fetch(`${BASE_URL}/service-categories`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load services');
  }

  return data;
};

const getSpecialists = async () => {
  const res = await fetch(`${BASE_URL}/users?role=specialist`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load specialists');
  }

  return data;
};

const getSpecialist = async (specialistId) => {
  const res = await fetch(`${BASE_URL}/users/${specialistId}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load specialist');
  }

  return data;
};

export {
  getServiceCategories,
  getSpecialists,
  getSpecialist,
};