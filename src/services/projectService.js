const updateProject = async (projectId, projectData) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Unable to update project');
  }

  return data;
};