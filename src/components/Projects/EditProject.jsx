import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getProject,
  updateProject,
} from '../../services/projectService';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    project_type: '',
    description: '',
    location: '',
    budget_range: '',
    status: '',
    progress: 0,
  });

  useEffect(() => {
    const loadProject = async () => {
      try {
        const project = await getProject(projectId);

        setFormData({
          title: project.title,
          project_type: project.project_type,
          description: project.description || '',
          location: project.location,
          budget_range: project.budget_range || '',
          status: project.status,
          progress: project.progress,
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProject();
  }, [projectId]);

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await updateProject(projectId, {
        ...formData,
        progress: Number(formData.progress),
      });

      navigate(`/projects/${projectId}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Edit Project</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="project_type">Project Type</label>
          <input
            type="text"
            id="project_type"
            name="project_type"
            value={formData.project_type}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="budget_range">Budget Range</label>
          <input
            type="text"
            id="budget_range"
            name="budget_range"
            value={formData.budget_range}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="progress">Progress</label>
          <input
            type="number"
            id="progress"
            name="progress"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate(`/projects/${projectId}`)}
        >
          Cancel
        </button>
      </form>
    </main>
  );
};

export default EditProject;