import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getSpecialist } from '../../services/serviceService';

import './SpecialistProfile.css';

const SpecialistProfile = () => {
  const { specialistId } = useParams();

  const [specialist, setSpecialist] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSpecialist = async () => {
      try {
        const data = await getSpecialist(specialistId);
        setSpecialist(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadSpecialist();
  }, [specialistId]);

  if (message) {
    return (
      <main className="specialist-profile-page">
        <p className="specialist-profile-message">
          {message}
        </p>
      </main>
    );
  }

  if (!specialist) {
    return (
      <main className="specialist-profile-page">
        <p className="specialist-profile-loading">
          Loading specialist...
        </p>
      </main>
    );
  }

  return (
    <main className="specialist-profile-page">
      <Link
        to="/services"
        className="specialist-profile-back"
      >
        ← Back to Services
      </Link>

      <section className="specialist-profile-hero">
        <div className="specialist-profile-avatar">
          {specialist.name?.charAt(0).toUpperCase()}
        </div>

        <div className="specialist-profile-heading">
          <p className="specialist-profile-label">
            BUNYAN Specialist
          </p>

          <h1>{specialist.name}</h1>

          <span className="specialist-profile-specialty">
            {specialist.specialty || 'Specialist'}
          </span>
        </div>
      </section>

      <section className="specialist-profile-layout">
        <div className="specialist-profile-main">
          <section className="specialist-profile-section">
            <p className="specialist-profile-small-label">
              Specialist Information
            </p>

            <h2>About the specialist</h2>

            <p>
              Connect with this specialist for property
              maintenance, improvements, and smaller service jobs.
            </p>
          </section>

          <section className="specialist-profile-info-grid">
            <div className="specialist-info-card">
              <span>Specialty</span>

              <strong>
                {specialist.specialty || 'Not specified'}
              </strong>
            </div>

            <div className="specialist-info-card">
              <span>Email</span>

              <strong>{specialist.email}</strong>
            </div>

            <div className="specialist-info-card">
              <span>Phone</span>

              <strong>
                {specialist.phone || 'Not specified'}
              </strong>
            </div>

            <div className="specialist-info-card">
              <span>Professional Type</span>

              <strong>BUNYAN Specialist</strong>
            </div>
          </section>
        </div>

        <aside className="specialist-profile-sidebar">
          <section className="specialist-request-card">
            <p className="specialist-request-label">
              Service Request
            </p>

            <h2>
              Need help with a property job?
            </h2>

            <p>
              Send a service request and provide the details
              of the work you need completed.
            </p>

            <Link
              to={`/specialists/${specialist.id}/request`}
              className="specialist-request-button"
            >
              Request Service
              <span>→</span>
            </Link>
          </section>
        </aside>
      </section>
    </main>
  );
};

export default SpecialistProfile;