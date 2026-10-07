import {
  useContext,
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getConsultations } from '../../services/consultationService';

import './Consultations.css';


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


  const pageTitle =
    user?.role === 'admin'
      ? 'All Consultations'
      : user?.role === 'engineer'
        ? 'Client Consultations'
        : 'My Consultations';


  const pageDescription =
    user?.role === 'admin'
      ? 'Review consultation activity across the BUNYAN platform.'
      : user?.role === 'engineer'
        ? 'View consultation requests scheduled with your clients.'
        : 'View your consultation requests, meeting details, and current status.';


  return (
    <main className="consultations-page">

      <section className="consultations-header">
        <p className="consultations-label">
          BUNYAN Consultations
        </p>

        <h1>{pageTitle}</h1>

        <p>{pageDescription}</p>
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

          <h2>No consultations found</h2>

          <p>
            {user?.role === 'admin'
              ? 'There are no consultation requests on the platform yet.'
              : user?.role === 'engineer'
                ? 'You do not have any client consultations yet.'
                : 'Your engineering consultation requests will appear here.'}
          </p>

          {user?.role === 'client' && (
            <Link to="/professionals">
              Browse Professionals →
            </Link>
          )}

        </section>
      ) : (
        <section className="consultations-grid">

          {consultations.map(
            (consultation, index) => (
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

                  <p className="consultation-card-label">
                    Engineering Consultation
                  </p>

                  <h2>
                    {consultation.topic}
                  </h2>


                  <div className="consultation-info">

                    <div>
                      <span>Meeting Type</span>

                      <strong>
                        {consultation.meeting_type}
                      </strong>
                    </div>


                    <div>
                      <span>Date</span>

                      <strong>
                        {new Date(
                          consultation.scheduled_at
                        ).toLocaleString()}
                      </strong>
                    </div>

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
            )
          )}

        </section>
      )}

    </main>
  );
};


export default Consultations;
