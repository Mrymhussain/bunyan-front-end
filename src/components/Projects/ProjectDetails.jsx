import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getProject } from '../../services/projectService';

import './ProjectDetails.css';

const ProjectDetails = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProject(projectId);
        setProject(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProject();
  }, [projectId]);

  if (message) {
    return (
      <main className="project-details-page">
        <p className="project-details-message">
          {message}
        </p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="project-details-page">
        <p className="project-details-loading">
          Loading project...
        </p>
      </main>
    );
  }

  return (
    <main className="project-details-page">
      <Link
        to="/projects"
        className="project-details-back"
      >
        ← Back to Projects
      </Link>

      <section className="project-details-header">
        <div>
          <p className="project-details-label">
            {project.project_type}
          </p>

          <h1>{project.title}</h1>

          <p className="project-details-location">
            {project.location}
          </p>
        </div>

        <span className="project-details-status">
          {project.status}
        </span>
      </section>

      <section className="project-details-layout">
        <div className="project-details-main">
          <div className="project-details-section">
            <p className="project-details-small-label">
              Project Description
            </p>

            <h2>About this project</h2>

            <p className="project-details-description">
              {project.description || 'No description provided.'}
            </p>
          </div>

          <div className="project-details-info-grid">
            <div className="project-info-box">
              <span>Project Type</span>
              <strong>{project.project_type}</strong>
            </div>

            <div className="project-info-box">
              <span>Location</span>
              <strong>{project.location}</strong>
            </div>

            <div className="project-info-box">
              <span>Budget Range</span>
              <strong>
                {project.budget_range || 'Not specified'}
              </strong>
            </div>

            <div className="project-info-box">
              <span>Status</span>
              <strong>{project.status}</strong>
            </div>
          </div>
        </div>

        <aside className="project-details-sidebar">
          <div className="project-progress-card">
            <p>Project Progress</p>

            <div className="project-progress-value">
              {project.progress || 0}
              <span>%</span>
            </div>

            <div className="project-details-progress-track">
              <div
                className="project-details-progress-fill"
                style={{
                  width: `${project.progress || 0}%`,
                }}
              />
            </div>

            <span className="project-progress-text">
              Current completion
            </span>
          </div>

          <Link
            to={`/projects/${project.id}/edit`}
            className="project-details-edit"
          >
            Edit Project
            <span>→</span>
          </Link>
        </aside>
      </section>
    </main>
  );
};

export default ProjectDetails;