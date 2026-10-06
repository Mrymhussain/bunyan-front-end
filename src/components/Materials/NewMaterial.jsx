import { useState } from 'react';
import { useNavigate } from 'react-router';

import { createMaterial } from '../../services/materialService';

import './MaterialForm.css';

const NewMaterial = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock_quantity: '',
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
      await createMaterial({
        ...formData,
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
      });

      navigate('/materials');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="material-form-page">
      <section className="material-form-header">
        <p className="material-form-label">
          Supplier Workspace
        </p>

        <h1>Add Material</h1>

        <p>
          Add a building material to the BUNYAN marketplace.
        </p>
      </section>

      <section className="material-form-card">
        {message && (
          <p className="material-form-message">
            {message}
          </p>
        )}

        <form
          className="material-form"
          onSubmit={handleSubmit}
        >
          <div className="material-form-row">
            <div className="material-form-field">
              <label htmlFor="name">
                Material Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Porcelain Tiles"
                required
              />
            </div>

            <div className="material-form-field">
              <label htmlFor="category">
                Category
              </label>

              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Tiles, paint, flooring..."
                required
              />
            </div>
          </div>

          <div className="material-form-field">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the material..."
              rows="5"
            />
          </div>

          <div className="material-form-row">
            <div className="material-form-field">
              <label htmlFor="price">
                Price (BHD)
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>

            <div className="material-form-field">
              <label htmlFor="stock_quantity">
                Stock Quantity
              </label>

              <input
                type="number"
                min="0"
                id="stock_quantity"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="material-form-actions">
            <button
              type="submit"
              className="material-form-submit"
            >
              Add Material
              <span>→</span>
            </button>

            <button
              type="button"
              className="material-form-cancel"
              onClick={() => navigate('/materials')}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewMaterial;
