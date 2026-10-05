const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getProfessionals = async () => {
  const res = await fetch(`${BASE_URL}/users?role=engineer`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load professionals');
  }

  return data;
};

const getProfessional = async (engineerId) => {
  const res = await fetch(`${BASE_URL}/users/${engineerId}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to load engineer');
  }

  return data;
};

export {
  getProfessionals,
  getProfessional,
};