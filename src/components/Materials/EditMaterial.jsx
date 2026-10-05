import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getMaterial,
  updateMaterial,
} from '../../services/materialService';

const EditMaterial = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock_quantity: '',
  });

  useEffect(() => {
    const loadMaterial = async () => {
      try {
        const material = await getMaterial(materialId);

        setFormData({
          name: material.name,
          category: material.category,
          description: material.description || '',
          price: material.price,
          stock_quantity: material.stock_quantity,
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadMaterial();
  }, [materialId]);

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
      await updateMaterial(materialId, {
        ...formData,
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
      });

      navigate(`/materials/${materialId}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Edit Material</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Material Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
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
          <label htmlFor="price">Price</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="stock_quantity">Stock Quantity</label>
          <input
            type="number"
            id="stock_quantity"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate(`/materials/${materialId}`)}
        >
          Cancel
        </button>
      </form>
    </main>
  );
};

export default EditMaterial;