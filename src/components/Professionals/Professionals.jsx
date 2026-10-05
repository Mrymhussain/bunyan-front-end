import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { getProfessionals } from '../../services/professionalService';

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        const data = await getProfessionals();
        setProfessionals(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadProfessionals();
  }, []);

  return (
    <main>
      <h1>Professionals</h1>

      <p>
        Find engineers and request a consultation.
      </p>

      {message && <p>{message}</p>}

      {professionals.length === 0 ? (
        <p>No engineers available.</p>
      ) : (
        <div>
          {professionals.map((professional) => (
            <div key={professional.id}>
              <h2>{professional.name}</h2>

              <p>
                Specialty: {professional.specialty || 'Not specified'}
              </p>

              <p>{professional.email}</p>

              <Link to={`/engineers/${professional.id}`}>
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Professionals;