import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getProjects } from '../../services/projectService';

import './Projects.css';

const Projects = () => {
  const { user } = useContext(UserContext);

  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProjects();
  }, []);

  const getStatusClass = (status) => {
    return status
      ? status.toLowerCase().replaceAll(' ', '-')
      : 'pending';
  };

  return (
    <main className="projects-page">
      <section className="projects-header">
        <div>
          <p className="projects-label">
            BUNYAN Projects
          </p>

          <h1>
            {user?.role === 'client'
              ? 'My Projects'
              : 'Projects'}
          </h1>

          <p className="projects-description">
            {user?.role === 'client'
              ? 'Create and track your engineering projects from one place.'
              : 'View and manage engineering projects on BUNYAN.'}
          </p>
        </div>

        {user?.role === 'client' && (
          <Link
            to="/projects/new"
            className="projects-create-button"
          >
            <span>+</span>
            New Project
          </Link>
        )}
      </section>

      {message && (
        <p className="projects-message">
          {message}
        </p>
      )}

      {projects.length === 0 ? (
        <section className="projects-empty">
          <div className="projects-empty-number">
            01
          </div>

          <h2>No projects yet</h2>

          <p>
            {user?.role === 'client'
              ? 'Start your first project and manage its progress through BUNYAN.'
              : 'There are no projects available right now.'}
          </p>

          {user?.role === 'client' && (
            <Link to="/projects/new">
              Create Your First Project →
            </Link>
          )}
        </section>
      ) : (
        <section className="projects-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card"
            >
              <div className="project-card-top">
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span
                  className={`project-status ${getStatusClass(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="project-card-content">
                <p className="project-type">
                  {project.project_type}
                </p>

                <h2>{project.title}</h2>

                <div className="project-location">
                  <span>Location</span>
                  <strong>
                    {project.location || 'Not specified'}
                  </strong>
                </div>
              </div>

              <div className="project-progress">
                <div className="project-progress-heading">
                  <span>Progress</span>

                  <strong>
                    {project.progress || 0}%
                  </strong>
                </div>

                <div className="project-progress-track">
                  <div
                    className="project-progress-fill"
                    style={{
                      width: `${project.progress || 0}%`,
                    }}
                  />
                </div>
              </div>

              <Link
                to={`/projects/${project.id}`}
                className="project-view-link"
              >
                View Project
                <span>→</span>
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Projects;