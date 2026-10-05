import { useState } from 'react';
import { useNavigate } from 'react-router';

import { createProject } from '../../services/projectService';

const NewProject = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    project_type: '',
    description: '',
    location: '',
    budget_range: '',
  });

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
      await createProject(formData);
      navigate('/projects');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Create New Project</h1>

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

        <button type="submit">
          Create Project
        </button>

        <button
          type="button"
          onClick={() => navigate('/projects')}
        >
          Cancel
        </button>
      </form>
    </main>
  );
};

export default NewProject;