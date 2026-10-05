import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { getConsultations } from '../../services/consultationService';

const Consultations = () => {
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

  return (
    <main>
      <h1>My Consultations</h1>

      {message && <p>{message}</p>}

      {consultations.length === 0 ? (
        <p>No consultations yet.</p>
      ) : (
        <div>
          {consultations.map((consultation) => (
            <div key={consultation.id}>
              <h2>{consultation.topic}</h2>

              <p>Status: {consultation.status}</p>
              <p>Meeting Type: {consultation.meeting_type}</p>
              <p>Date: {consultation.scheduled_at}</p>

              <Link to={`/consultations/${consultation.id}`}>
                View Consultation
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Consultations;