import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { getProjects } from '../../services/projectService';

const Projects = () => {
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

  return (
    <main>
      <h1>My Projects</h1>

      <Link to="/projects/new">
        Create New Project
      </Link>

      {message && <p>{message}</p>}

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <div>
          {projects.map((project) => (
            <div key={project.id}>
              <h2>{project.title}</h2>

              <p>{project.project_type}</p>
              <p>{project.location}</p>
              <p>Status: {project.status}</p>
              <p>Progress: {project.progress}%</p>

              <Link to={`/projects/${project.id}`}>
                View Project
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Projects;