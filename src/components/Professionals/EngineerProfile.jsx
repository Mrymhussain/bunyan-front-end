import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getProfessional } from '../../services/professionalService';

import './EngineerProfile.css';

const EngineerProfile = () => {
  const { engineerId } = useParams();

  const [engineer, setEngineer] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadEngineer = async () => {
      try {
        const data = await getProfessional(engineerId);
        setEngineer(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadEngineer();
  }, [engineerId]);

  if (message) {
    return (
      <main className="engineer-profile-page">
        <p className="engineer-profile-message">
          {message}
        </p>
      </main>
    );
  }

  if (!engineer) {
    return (
      <main className="engineer-profile-page">
        <p className="engineer-profile-loading">
          Loading engineer...
        </p>
      </main>
    );
  }

  return (
    <main className="engineer-profile-page">
      <Link
        to="/professionals"
        className="engineer-profile-back"
      >
        ← Back to Professionals
      </Link>

      <section className="engineer-profile-hero">
        <div className="engineer-profile-avatar">
          {engineer.name?.charAt(0).toUpperCase()}
        </div>

        <div className="engineer-profile-heading">
          <p className="engineer-profile-label">
            BUNYAN Professional
          </p>

          <h1>{engineer.name}</h1>

          <span className="engineer-profile-specialty">
            {engineer.specialty || 'Engineer'}
          </span>
        </div>
      </section>

      <section className="engineer-profile-layout">
        <div className="engineer-profile-main">
          <div className="engineer-profile-section">
            <p className="engineer-profile-small-label">
              Professional Information
            </p>

            <h2>About the professional</h2>

            <p>
              Connect with this professional to discuss
              your project requirements and request an
              engineering consultation.
            </p>
          </div>

          <div className="engineer-profile-info-grid">
            <div className="engineer-info-card">
              <span>Specialty</span>

              <strong>
                {engineer.specialty || 'Not specified'}
              </strong>
            </div>

            <div className="engineer-info-card">
              <span>Email</span>

              <strong>
                {engineer.email}
              </strong>
            </div>

            <div className="engineer-info-card">
              <span>Phone</span>

              <strong>
                {engineer.phone || 'Not specified'}
              </strong>
            </div>

            <div className="engineer-info-card">
              <span>Professional</span>

              <strong>
                BUNYAN Engineer
              </strong>
            </div>
          </div>
        </div>

        <aside className="engineer-profile-sidebar">
          <div className="engineer-consultation-card">
            <p className="engineer-consultation-label">
              Consultation
            </p>

            <h2>
              Have a project in mind?
            </h2>

            <p>
              Send a consultation request and discuss
              your requirements directly with this
              professional.
            </p>

            <Link
              to={`/engineers/${engineer.id}/consultation`}
              className="engineer-consultation-button"
            >
              Request Consultation
              <span>→</span>
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default EngineerProfile;