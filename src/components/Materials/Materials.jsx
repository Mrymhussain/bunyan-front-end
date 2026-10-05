import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getMaterials } from '../../services/materialService';

const Materials = () => {
  const { user } = useContext(UserContext);

  const [materials, setMaterials] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const data = await getMaterials();
        setMaterials(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    loadMaterials();
  }, []);

  return (
    <main>
      <h1>Materials</h1>

      <p>
        Browse building materials available from suppliers.
      </p>

      {user?.role === 'supplier' && (
        <Link to="/materials/new">
          Add Material
        </Link>
      )}

      {message && <p>{message}</p>}

      {materials.length === 0 ? (
        <p>No materials available.</p>
      ) : (
        <div>
          {materials.map((material) => (
            <div key={material.id}>
              <h2>{material.name}</h2>

              <p>Category: {material.category}</p>
              <p>Price: {material.price} BHD</p>
              <p>Stock: {material.stock_quantity}</p>

              <Link to={`/materials/${material.id}`}>
                View Material
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Materials;