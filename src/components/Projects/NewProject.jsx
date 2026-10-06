import { useState } from 'react';
import { useNavigate } from 'react-router';

import { createProject } from '../../services/projectService';

import './ProjectForm.css';

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
    <main className="project-form-page">
      <section className="project-form-header">
        <p className="project-form-label">
          New Project
        </p>

        <h1>Create a Project</h1>

        <p>
          Tell us about your project and start managing
          your engineering journey through BUNYAN.
        </p>
      </section>

      <section className="project-form-card">
        {message && (
          <p className="project-form-message">
            {message}
          </p>
        )}

        <form
          className="project-form"
          onSubmit={handleSubmit}
        >
          <div className="project-form-field">
            <label htmlFor="title">
              Project Title
            </label>

            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: New Villa Construction"
              required
            />
          </div>

          <div className="project-form-row">
            <div className="project-form-field">
              <label htmlFor="project_type">
                Project Type
              </label>

              <input
                type="text"
                id="project_type"
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
                placeholder="Villa, renovation, extension..."
                required
              />
            </div>

            <div className="project-form-field">
              <label htmlFor="location">
                Location
              </label>

              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Example: Riffa"
                required
              />
            </div>
          </div>

          <div className="project-form-field">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you want to build or improve..."
              rows="5"
            />
          </div>

          <div className="project-form-field">
            <label htmlFor="budget_range">
              Budget Range
            </label>

            <input
              type="text"
              id="budget_range"
              name="budget_range"
              value={formData.budget_range}
              onChange={handleChange}
              placeholder="Example: BHD 20,000 - 30,000"
            />
          </div>

          <div className="project-form-actions">
            <button
              type="submit"
              className="project-form-submit"
            >
              Create Project
              <span>→</span>
            </button>

            <button
              type="button"
              className="project-form-cancel"
              onClick={() => navigate('/projects')}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewProject;