import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getConsultations } from '../../services/consultationService';

import './ConsultationForm.css';

const Consultations = () => {
  const { user } = useContext(UserContext);

  const [consultations, setConsultations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadConsultations = async () => {
      try {
        const data = await getConsultations();
        setConsultations(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadConsultations();
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return 'Not scheduled';
    }

    return new Date(date).toLocaleString();
  };

  return (
    <main className="consultations-page">
      <section className="consultations-header">
        <p className="consultations-label">
          BUNYAN Consultations
        </p>

        <h1>
          {user?.role === 'engineer'
            ? 'Consultation Requests'
            : 'My Consultations'}
        </h1>

        <p>
          {user?.role === 'engineer'
            ? 'View consultation requests and scheduled meetings with clients.'
            : 'Track your engineering consultation requests and meeting details.'}
        </p>
      </section>

      {message && (
        <p className="consultations-message">
          {message}
        </p>
      )}

      {consultations.length === 0 ? (
        <section className="consultations-empty">
          <div className="consultations-empty-number">
            01
          </div>

          <h2>No consultations yet</h2>

          <p>
            {user?.role === 'engineer'
              ? 'There are no consultation requests available right now.'
              : 'Browse our professionals and request a consultation with an engineer.'}
          </p>

          {user?.role === 'client' && (
            <Link to="/professionals">
              Find an Engineer →
            </Link>
          )}
        </section>
      ) : (
        <section className="consultations-grid">
          {consultations.map((consultation, index) => (
            <article
              key={consultation.id}
              className="consultation-card"
            >
              <div className="consultation-card-top">
                <span className="consultation-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="consultation-status">
                  {consultation.status}
                </span>
              </div>

              <div className="consultation-card-content">
                <p className="consultation-type">
                  {consultation.meeting_type === 'in_person'
                    ? 'In Person'
                    : 'Online'}
                </p>

                <h2>{consultation.topic}</h2>

                <div className="consultation-date">
                  <span>Scheduled For</span>

                  <strong>
                    {formatDate(consultation.scheduled_at)}
                  </strong>
                </div>
              </div>

              <Link
                to={`/consultations/${consultation.id}`}
                className="consultation-view-link"
              >
                View Consultation
                <span>→</span>
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Consultations;