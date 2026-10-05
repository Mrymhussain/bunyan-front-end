import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import {
  getServiceCategories,
  getSpecialists,
} from '../../services/serviceService';

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
    <main>
      <h1>Services</h1>

      <p>
        Find specialists for small jobs and property services.
      </p>

      {message && <p>{message}</p>}

      <section>
        <h2>Service Categories</h2>

        {categories.length === 0 ? (
          <p>No service categories available.</p>
        ) : (
          <div>
            {categories.map((category) => (
              <div key={category.id}>
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Specialists</h2>

        {specialists.length === 0 ? (
          <p>No specialists available.</p>
        ) : (
          <div>
            {specialists.map((specialist) => (
              <div key={specialist.id}>
                <h3>{specialist.name}</h3>

                <p>
                  Specialty: {specialist.specialty || 'Not specified'}
                </p>

                <Link to={`/specialists/${specialist.id}`}>
                  View Specialist
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Services;