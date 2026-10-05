import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { createConsultation } from '../../services/consultationService';

const ConsultationForm = () => {
  const { engineerId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    date: '',
    time: '',
    meeting_type: 'online',
  });

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
      const consultationData = {
        engineer_id: Number(engineerId),
        topic: formData.topic,
        description: formData.description,
        scheduled_at: `${formData.date}T${formData.time}:00`,
        meeting_type: formData.meeting_type,
      };

      await createConsultation(consultationData);

      navigate('/consultations');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Request Consultation</h1>

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
          <label htmlFor="date">Preferred Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="time">Preferred Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
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
          Request Consultation
        </button>

        <button
          type="button"
          onClick={() => navigate(`/engineers/${engineerId}`)}
        >
          Cancel
        </button>
      </form>
    </main>
  );
};

export default ConsultationForm;