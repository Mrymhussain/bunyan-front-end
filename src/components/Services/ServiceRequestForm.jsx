import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getServiceCategories } from '../../services/serviceService';
import { createServiceRequest } from '../../services/serviceRequestService';

import './ServiceRequestForm.css';

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
    <main className="service-request-form-page">
      <section className="service-request-form-header">
        <p className="service-request-form-label">
          Property Service
        </p>

        <h1>Request a Service</h1>

        <p>
          Tell the specialist what you need, where the job
          is located, and your preferred date.
        </p>
      </section>

      <section className="service-request-form-card">
        {message && (
          <p className="service-request-form-message">
            {message}
          </p>
        )}

        <form
          className="service-request-form"
          onSubmit={handleSubmit}
        >
          <div className="service-request-form-field">
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
              <option value="">
                Select a service
              </option>

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

          <div className="service-request-form-field">
            <label htmlFor="description">
              Job Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the work you need..."
              rows="5"
              required
            />
          </div>

          <div className="service-request-form-row">
            <div className="service-request-form-field">
              <label htmlFor="location">
                Location
              </label>

              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Example: Manama"
                required
              />
            </div>

            <div className="service-request-form-field">
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
          </div>

          <div className="service-request-form-actions">
            <button
              type="submit"
              className="service-request-form-submit"
            >
              Submit Request
              <span>→</span>
            </button>

            <button
              type="button"
              className="service-request-form-cancel"
              onClick={() =>
                navigate(`/specialists/${specialistId}`)
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ServiceRequestForm;