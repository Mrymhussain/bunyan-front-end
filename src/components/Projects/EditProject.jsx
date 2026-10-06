import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getProject,
  updateProject,
} from '../../services/projectService';

import './ProjectForm.css';

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
    <main className="project-form-page">
      <section className="project-form-header">
        <p className="project-form-label">
          Project Management
        </p>

        <h1>Edit Project</h1>

        <p>
          Update the project information, status,
          and current progress.
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
              placeholder="Project title"
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
                placeholder="Project type"
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
                placeholder="Project location"
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
              placeholder="Project description"
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

          <div className="project-form-row">
            <div className="project-form-field">
              <label htmlFor="status">
                Status
              </label>

              <input
                type="text"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Project status"
              />
            </div>

            <div className="project-form-field">
              <label htmlFor="progress">
                Progress
              </label>

              <div className="edit-progress-input">
                <input
                  type="number"
                  id="progress"
                  name="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                />

                <span>%</span>
              </div>
            </div>
          </div>

          <div className="edit-project-progress">
            <div className="edit-project-progress-heading">
              <span>Current Progress</span>

              <strong>
                {formData.progress || 0}%
              </strong>
            </div>

            <div className="edit-project-progress-track">
              <div
                className="edit-project-progress-fill"
                style={{
                  width: `${formData.progress || 0}%`,
                }}
              />
            </div>
          </div>

          <div className="project-form-actions">
            <button
              type="submit"
              className="project-form-submit"
            >
              Save Changes
              <span>→</span>
            </button>

            <button
              type="button"
              className="project-form-cancel"
              onClick={() =>
                navigate(`/projects/${projectId}`)
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditProject;