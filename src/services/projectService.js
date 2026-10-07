import { getToken } from '../lib/helpers/jwt-helpers';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const request = async (url, options = {}) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.body && {
        'Content-Type': 'application/json',
      }),
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (res.status === 204) {
    return null;
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || 'Something went wrong');
  }

  return data;
};

const getProjects = () => {
  return request('/projects');
};

const getProject = (projectId) => {
  return request(`/projects/${projectId}`);
};

const createProject = (projectData) => {
  return request('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
};

const updateProject = (projectId, projectData) => {
  return request(`/projects/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  });
};

const deleteProject = (projectId) => {
  return request(`/projects/${projectId}`, {
    method: 'DELETE',
  });
};

const updateProjectWork = (projectId, projectData) => {
  return request(`/projects/${projectId}/work`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  });
};

const updateProjectMeeting = (projectId, meetingData) => {
  return request(`/projects/${projectId}/meeting`, {
    method: 'PUT',
    body: JSON.stringify(meetingData),
  });
};

const getProjectMembers = (projectId) => {
  return request(`/projects/${projectId}/members`);
};

const addProjectMember = (projectId, memberData) => {
  return request(`/projects/${projectId}/members`, {
    method: 'POST',
    body: JSON.stringify(memberData),
  });
};

const removeProjectMember = (projectId, memberId) => {
  return request(
    `/projects/${projectId}/members/${memberId}`,
    {
      method: 'DELETE',
    }
  );
};

const updateMemberApproval = (
  projectId,
  memberId,
  approvalData
) => {
  return request(
    `/projects/${projectId}/members/${memberId}/approval`,
    {
      method: 'PUT',
      body: JSON.stringify(approvalData),
    }
  );
};

const getProjectUpdates = (projectId) => {
  return request(`/projects/${projectId}/updates`);
};

const createProjectUpdate = (projectId, updateData) => {
  return request(`/projects/${projectId}/updates`, {
    method: 'POST',
    body: JSON.stringify(updateData),
  });
};

export {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  updateProjectWork,
  updateProjectMeeting,
  getProjectMembers,
  addProjectMember,
  removeProjectMember,
  updateMemberApproval,
  getProjectUpdates,
  createProjectUpdate,
};
