import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import {
  getServiceCategories,
  getSpecialists,
} from '../../services/serviceService';

import './Services.css';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const categoryData = await getServiceCategories();
        const specialistData = await getSpecialists();

        setCategories(categoryData);
        setSpecialists(specialistData);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadServices();
  }, []);

  return (
    <main className="services-page">
      <section className="services-header">
        <p className="services-label">
          BUNYAN Services
        </p>

        <h1>Find the Right Specialist</h1>

        <p>
          Browse property services and connect with specialists
          for smaller jobs and home improvements.
        </p>
      </section>

      {message && (
        <p className="services-message">
          {message}
        </p>
      )}

      <section className="service-categories-section">
        <div className="services-section-heading">
          <div>
            <p>Service Categories</p>
            <h2>What do you need help with?</h2>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="services-empty">
            <h3>No service categories available</h3>
          </div>
        ) : (
          <div className="service-categories-grid">
            {categories.map((category, index) => (
              <article
                key={category.id}
                className="service-category-card"
              >
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3>{category.name}</h3>

                <p>
                  Explore specialists available for this service.
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="specialists-section">
        <div className="services-section-heading">
          <div>
            <p>Available Specialists</p>
            <h2>Connect with a professional</h2>
          </div>
        </div>

        {specialists.length === 0 ? (
          <div className="services-empty">
            <h3>No specialists available</h3>
          </div>
        ) : (
          <div className="specialists-grid">
            {specialists.map((specialist) => (
              <article
                key={specialist.id}
                className="specialist-card"
              >
                <div className="specialist-card-top">
                  <div className="specialist-avatar">
                    {specialist.image_url ? (
                      <img
                        src={specialist.image_url}
                        alt={specialist.name}
                      />
                    ) : (
                      specialist.name
                        ?.charAt(0)
                        .toUpperCase()
                    )}
                  </div>

                  <span className="specialist-badge">
                    {specialist.specialty || 'Specialist'}
                  </span>
                </div>

                <div className="specialist-card-content">
                  <p className="specialist-label">
                    BUNYAN Specialist
                  </p>

                  <h3>{specialist.name}</h3>

                  <p className="specialist-specialty">
                    {specialist.specialty || 'Not specified'}
                  </p>
                </div>

                <Link
                  to={`/specialists/${specialist.id}`}
                  className="specialist-view-link"
                >
                  View Specialist
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Services;