import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { getProjects } from '../../services/projectService';
import { getConsultations } from '../../services/consultationService';
import { getReviews } from '../../services/reviewService';

import './EngineerDashboard.css';

const EngineerDashboard = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [projectData, consultationData, reviewData] =
          await Promise.all([
            getProjects(),
            getConsultations(),
            getReviews(),
          ]);

        setProjects(projectData);
        setConsultations(consultationData);
        setReviews(reviewData);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadDashboard();
  }, []);

  const activeProjects = projects.filter(
    (project) =>
      project.status?.toLowerCase() !== 'completed'
  );

  const upcomingConsultations = consultations
    .filter(
      (consultation) =>
        consultation.scheduled_at &&
        new Date(consultation.scheduled_at) >= new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.scheduled_at) -
        new Date(b.scheduled_at)
    )
    .slice(0, 4);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : '—';

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <main className="engineer-dashboard">
      <section className="engineer-dashboard-header">
        <div>
          <p className="engineer-dashboard-label">
            Engineer Dashboard
          </p>

          <h1>Welcome back, {user.name}</h1>

          <p>
            {user.specialty || 'Engineer'} · Manage your
            projects, consultations and client feedback.
          </p>
        </div>

        <div className="engineer-dashboard-profile">
          {user.image_url ? (
            <img
              src={user.image_url}
              alt={user.name}
            />
          ) : (
            <span>
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </section>

      {message && (
        <p className="engineer-dashboard-message">
          {message}
        </p>
      )}

      <section className="engineer-summary">
        <div className="engineer-summary-item">
          <span>Assigned Projects</span>
          <strong>{projects.length}</strong>
        </div>

        <div className="engineer-summary-item">
          <span>Active Projects</span>
          <strong>{activeProjects.length}</strong>
        </div>

        <div className="engineer-summary-item">
          <span>Consultations</span>
          <strong>{consultations.length}</strong>
        </div>

        <div className="engineer-summary-item">
          <span>Client Rating</span>
          <strong>{averageRating}</strong>
        </div>
      </section>

      <section className="engineer-dashboard-content">
        <div className="engineer-dashboard-panel">
          <div className="engineer-panel-heading">
            <div>
              <p>Project Work</p>
              <h2>Active Projects</h2>
            </div>

            <Link to="/projects">
              View All →
            </Link>
          </div>

          {activeProjects.length === 0 ? (
            <p className="engineer-dashboard-empty">
              No active projects assigned.
            </p>
          ) : (
            <div className="engineer-projects-list">
              {activeProjects.slice(0, 3).map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="engineer-project-row"
                >
                  <div className="engineer-project-thumb">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                      />
                    ) : (
                      <span>B</span>
                    )}
                  </div>

                  <div className="engineer-project-row-info">
                    <div className="engineer-project-row-top">
                      <div>
                        <h3>{project.title}</h3>

                        <p>
                          {project.location || 'No location'}
                        </p>
                      </div>

                      <strong>
                        {project.progress || 0}%
                      </strong>
                    </div>

                    <div className="engineer-project-bar">
                      <div
                        style={{
                          width: `${project.progress || 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="engineer-dashboard-panel">
          <div className="engineer-panel-heading">
            <div>
              <p>Schedule</p>
              <h2>Upcoming Consultations</h2>
            </div>

            <Link to="/consultations">
              View All →
            </Link>
          </div>

          {upcomingConsultations.length === 0 ? (
            <p className="engineer-dashboard-empty">
              No upcoming consultations.
            </p>
          ) : (
            <div className="engineer-consultations-list">
              {upcomingConsultations.map(
                (consultation) => (
                  <Link
                    key={consultation.id}
                    to={`/consultations/${consultation.id}`}
                    className="engineer-consultation-row"
                  >
                    <div className="engineer-consultation-date">
                      <strong>
                        {formatDate(
                          consultation.scheduled_at
                        )}
                      </strong>

                      <span>
                        {formatTime(
                          consultation.scheduled_at
                        )}
                      </span>
                    </div>

                    <div>
                      <h3>{consultation.topic}</h3>

                      <p>
                        {consultation.meeting_type
                          ?.replaceAll('_', ' ')}
                      </p>
                    </div>

                    <span className="engineer-row-arrow">
                      →
                    </span>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </section>

    </main>
  );
};

export default EngineerDashboard;
