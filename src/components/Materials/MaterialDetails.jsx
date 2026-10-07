import { useContext, useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import {
  deleteMaterial,
  getMaterial,
} from '../../services/materialService';

import {
  addOrderItem,
  createOrder,
} from '../../services/orderService';

import './MaterialDetails.css';

const MaterialDetails = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [material, setMaterial] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadMaterial = async () => {
      try {
        const data = await getMaterial(materialId);
        setMaterial(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadMaterial();
  }, [materialId]);

  const handleOrder = async () => {
    setMessage('');

    try {
      const order = await createOrder({
        supplier_id: material.supplier_id,
        total_price: 0,
      });

      await addOrderItem(order.id, {
        material_id: material.id,
        quantity: Number(quantity),
      });

      navigate(`/orders/${order.id}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this material?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMaterial(materialId);
      navigate('/materials');
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (message && !material) {
    return (
      <main className="material-details-page">
        <p className="material-details-message">
          {message}
        </p>
      </main>
    );
  }

  if (!material) {
    return (
      <main className="material-details-page">
        <p className="material-details-loading">
          Loading material...
        </p>
      </main>
    );
  }

  return (
    <main className="material-details-page">
      <Link
        to="/materials"
        className="material-details-back"
      >
        ← Back to Materials
      </Link>

      {material.image_url && (
        <section className="material-details-image">
          <img
            src={material.image_url}
            alt={material.name}
          />
        </section>
      )}

      <section className="material-details-layout">
        <div className="material-details-main">
          <div className="material-details-heading">
            <p className="material-details-label">
              {material.category}
            </p>

            <h1>{material.name}</h1>

            <p>
              {material.description || 'No description available.'}
            </p>
          </div>

          <div className="material-details-info">
            <div className="material-details-info-card">
              <span>Price</span>

              <strong>
                {material.price} BHD
              </strong>
            </div>

            <div className="material-details-info-card">
              <span>Available Stock</span>

              <strong>
                {material.stock_quantity}
              </strong>
            </div>
          </div>

          {message && (
            <p className="material-details-message">
              {message}
            </p>
          )}

          {user?.role === 'client' && (
            <section className="material-order-card">
              <p className="material-order-label">
                Order Material
              </p>

              <h2>Select Quantity</h2>

              <p>
                Choose how many units you would like
                to order from this supplier.
              </p>

              <div className="material-order-controls">
                <div className="material-quantity-field">
                  <label htmlFor="quantity">
                    Quantity
                  </label>

                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={material.stock_quantity}
                    value={quantity}
                    onChange={(evt) =>
                      setQuantity(evt.target.value)
                    }
                  />
                </div>

                <button
                  type="button"
                  className="material-order-button"
                  onClick={handleOrder}
                >
                  Place Order
                  <span>→</span>
                </button>
              </div>
            </section>
          )}
        </div>

        <aside className="material-details-sidebar">
          <div className="material-details-summary">
            <p>Material #{material.id}</p>

            <div>
              <span>Category</span>
              <strong>{material.category}</strong>
            </div>

            <div>
              <span>Price</span>
              <strong>{material.price} BHD</strong>
            </div>

            <div>
              <span>Stock</span>
              <strong>{material.stock_quantity}</strong>
            </div>
          </div>

          {user?.role === 'supplier' && (
            <div className="material-details-actions">
              <Link
                to={`/materials/${material.id}/edit`}
                className="material-edit-button"
              >
                Edit Material
              </Link>

              <button
                type="button"
                className="material-delete-button"
                onClick={handleDelete}
              >
                Delete Material
              </button>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
};

export default MaterialDetails;
