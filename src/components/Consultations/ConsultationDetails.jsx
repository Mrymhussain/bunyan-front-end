import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router';

import {
  deleteConsultation,
  getConsultation,
} from '../../services/consultationService';

import './ConsultationDetails.css';

const ConsultationDetails = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();

  const [consultation, setConsultation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadConsultation = async () => {
      try {
        const data = await getConsultation(consultationId);
        setConsultation(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadConsultation();
  }, [consultationId]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this consultation?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteConsultation(consultationId);
      navigate('/consultations');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return 'Not scheduled';
    }

    return new Date(date).toLocaleString();
  };

  if (message) {
    return (
      <main className="consultation-details-page">
        <p className="consultation-details-message">
          {message}
        </p>
      </main>
    );
  }

  if (!consultation) {
    return (
      <main className="consultation-details-page">
        <p className="consultation-details-loading">
          Loading consultation...
        </p>
      </main>
    );
  }

  return (
    <main className="consultation-details-page">
      <Link
        to="/consultations"
        className="consultation-details-back"
      >
        ← Back to Consultations
      </Link>

      <section className="consultation-details-header">
        <div>
          <p className="consultation-details-label">
            Engineering Consultation
          </p>

          <h1>{consultation.topic}</h1>

          <p>
            View the consultation information,
            schedule, and current status.
          </p>
        </div>

        <span className="consultation-details-status">
          {consultation.status}
        </span>
      </section>

      <section className="consultation-details-layout">
        <div className="consultation-details-main">
          <section className="consultation-details-section">
            <p className="consultation-details-small-label">
              Consultation Details
            </p>

            <h2>About this consultation</h2>

            <p className="consultation-details-description">
              {consultation.description ||
                'No description provided.'}
            </p>
          </section>

          <section className="consultation-details-info-grid">
            <div className="consultation-info-card">
              <span>Status</span>

              <strong>
                {consultation.status}
              </strong>
            </div>

            <div className="consultation-info-card">
              <span>Meeting Type</span>

              <strong>
                {consultation.meeting_type === 'in_person'
                  ? 'In Person'
                  : 'Online'}
              </strong>
            </div>

            <div className="consultation-info-card consultation-info-wide">
              <span>Scheduled At</span>

              <strong>
                {formatDate(consultation.scheduled_at)}
              </strong>
            </div>
          </section>
        </div>

        <aside className="consultation-details-sidebar">
          <section className="consultation-action-card">
            <p>Manage Consultation</p>

            <h2>
              Need to make a change?
            </h2>

            <span>
              Update the consultation details or remove
              the request.
            </span>

            <Link
              to={`/consultations/${consultation.id}/edit`}
              className="consultation-edit-button"
            >
              Edit Consultation
              <strong>→</strong>
            </Link>

            <button
              type="button"
              className="consultation-delete-button"
              onClick={handleDelete}
            >
              Delete Consultation
            </button>
          </section>
        </aside>
      </section>
    </main>
  );
};

export default ConsultationDetails;