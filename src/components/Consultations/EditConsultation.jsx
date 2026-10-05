import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getConsultation,
  updateConsultation,
} from '../../services/consultationService';

const EditConsultation = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    scheduled_at: '',
    meeting_type: 'online',
  });

  useEffect(() => {
    const loadConsultation = async () => {
      try {
        const consultation = await getConsultation(consultationId);

        setFormData({
          topic: consultation.topic,
          description: consultation.description || '',
          scheduled_at: consultation.scheduled_at
            ? consultation.scheduled_at.slice(0, 16)
            : '',
          meeting_type: consultation.meeting_type,
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadConsultation();
  }, [consultationId]);

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
      await updateConsultation(consultationId, formData);

      navigate(`/consultations/${consultationId}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Edit Consultation</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="topic">Topic</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="scheduled_at">Date and Time</label>
          <input
            type="datetime-local"
            id="scheduled_at"
            name="scheduled_at"
            value={formData.scheduled_at}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="meeting_type">Meeting Type</label>

          <select
            id="meeting_type"
            name="meeting_type"
            value={formData.meeting_type}
            onChange={handleChange}
          >
            <option value="online">Online</option>
            <option value="in_person">In Person</option>
          </select>
        </div>

        <button type="submit">
          Save Changes
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(`/consultations/${consultationId}`)
          }
        >
          Cancel
        </button>
      </form>
    </main>
  );
};

export default EditConsultation;