import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getProfessional } from '../../services/professionalService';

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
    return <p>{message}</p>;
  }

  if (!engineer) {
    return <p>Loading engineer...</p>;
  }

  return (
    <main>
      <h1>{engineer.name}</h1>

      <p>Email: {engineer.email}</p>
      <p>Phone: {engineer.phone || 'Not specified'}</p>
      <p>Specialty: {engineer.specialty || 'Not specified'}</p>

      <Link to={`/engineers/${engineer.id}/consultation`}>
        Request Consultation
      </Link>

      <br />

      <Link to="/professionals">
        Back to Professionals
      </Link>
    </main>
  );
};

export default EngineerProfile;