import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getProject } from '../../services/projectService';

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
    return <p>{message}</p>;
  }

  if (!project) {
    return <p>Loading project...</p>;
  }

  return (
    <main>
      <h1>{project.title}</h1>

      <p>Type: {project.project_type}</p>
      <p>Description: {project.description || 'No description'}</p>
      <p>Location: {project.location}</p>
      <p>Budget: {project.budget_range || 'Not specified'}</p>
      <p>Status: {project.status}</p>
      <p>Progress: {project.progress}%</p>

      <Link to={`/projects/${project.id}/edit`}>
        Edit Project
      </Link>

      <br />

      <Link to="/projects">
        Back to Projects
      </Link>
    </main>
  );
};

export default ProjectDetails;