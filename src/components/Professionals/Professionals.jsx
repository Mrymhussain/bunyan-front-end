import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { getProfessionals } from '../../services/professionalService';

import './Professionals.css';

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
    <main className="professionals-page">
      <section className="professionals-header">
        <p className="professionals-label">
          BUNYAN Professionals
        </p>

        <h1>Find an Engineer</h1>

        <p>
          Browse engineering professionals and find the right
          expertise for your project or consultation.
        </p>
      </section>

      {message && (
        <p className="professionals-message">
          {message}
        </p>
      )}

      {professionals.length === 0 ? (
        <section className="professionals-empty">
          <div className="professionals-empty-icon">
            B
          </div>

          <h2>No professionals available</h2>

          <p>
            There are currently no engineers available.
            Please check again later.
          </p>
        </section>
      ) : (
        <section className="professionals-grid">
          {professionals.map((professional) => (
            <article
              key={professional.id}
              className="professional-card"
            >
              <div className="professional-card-top">
                <div className="professional-avatar">
                  {professional.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <span className="professional-specialty">
                  {professional.specialty || 'Engineer'}
                </span>
              </div>

              <div className="professional-card-content">
                <p className="professional-role">
                  Professional
                </p>

                <h2>{professional.name}</h2>

                <p className="professional-email">
                  {professional.email}
                </p>
              </div>

              <div className="professional-card-footer">
                <div>
                  <span>Specialty</span>

                  <strong>
                    {professional.specialty ||
                      'Not specified'}
                  </strong>
                </div>

                <Link
                  to={`/engineers/${professional.id}`}
                >
                  View Profile
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Professionals;