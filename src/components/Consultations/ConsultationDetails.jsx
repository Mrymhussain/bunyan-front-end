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

  if (message) {
    return <p>{message}</p>;
  }

  if (!consultation) {
    return <p>Loading consultation...</p>;
  }

  return (
    <main>
      <h1>{consultation.topic}</h1>

      <p>
        Description: {consultation.description || 'No description'}
      </p>

      <p>Status: {consultation.status}</p>
      <p>Meeting Type: {consultation.meeting_type}</p>
      <p>Scheduled At: {consultation.scheduled_at}</p>

      <Link to={`/consultations/${consultation.id}/edit`}>
        Edit Consultation
      </Link>

      <br />

      <button type="button" onClick={handleDelete}>
        Delete Consultation
      </button>

      <br />

      <Link to="/consultations">
        Back to Consultations
      </Link>
    </main>
  );
};

export default ConsultationDetails;