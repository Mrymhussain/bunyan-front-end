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
    return <p>{message}</p>;
  }

  if (!material) {
    return <p>Loading material...</p>;
  }

  return (
    <main>
      <h1>{material.name}</h1>

      <p>Category: {material.category}</p>

      <p>
        Description: {material.description || 'No description'}
      </p>

      <p>Price: {material.price} BHD</p>
      <p>Stock: {material.stock_quantity}</p>

      {message && <p>{message}</p>}

      {user?.role === 'client' && (
        <div>
          <label htmlFor="quantity">
            Quantity
          </label>

          <input
            type="number"
            id="quantity"
            min="1"
            max={material.stock_quantity}
            value={quantity}
            onChange={(evt) => setQuantity(evt.target.value)}
          />

          <button
            type="button"
            onClick={handleOrder}
          >
            Place Order
          </button>
        </div>
      )}

      {user?.role === 'supplier' && (
        <>
          <Link to={`/materials/${material.id}/edit`}>
            Edit Material
          </Link>

          <br />

          <button
            type="button"
            onClick={handleDelete}
          >
            Delete Material
          </button>

          <br />
        </>
      )}

      <Link to="/materials">
        Back to Materials
      </Link>
    </main>
  );
};

export default MaterialDetails;