import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getServiceCategories } from '../../services/serviceService';
import { createServiceRequest } from '../../services/serviceRequestService';

const ServiceRequestForm = () => {
  const { specialistId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    service_category_id: '',
    description: '',
    location: '',
    preferred_date: '',
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getServiceCategories();
        setCategories(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (evt) => {
    setMessage('');

    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const requestData = {
        specialist_id: Number(specialistId),
        service_category_id: Number(formData.service_category_id),
        description: formData.description,
        location: formData.location,
        preferred_date: formData.preferred_date,
      };

      await createServiceRequest(requestData);

      navigate('/service-requests');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Request Service</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="service_category_id">
            Service Category
          </label>

          <select
            id="service_category_id"
            name="service_category_id"
            value={formData.service_category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="location">
            Location
          </label>

          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="preferred_date">
            Preferred Date
          </label>

          <input
            type="datetime-local"
            id="preferred_date"
            name="preferred_date"
            value={formData.preferred_date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          Submit Request
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(`/specialists/${specialistId}`)
          }
        >
          Cancel
        </button>
      </form>
    </main>
  );
};

export default ServiceRequestForm;