import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getMaterials } from '../../services/materialService';

import './Materials.css';

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
    <main className="materials-page">
      <section className="materials-header">
        <div>
          <p className="materials-label">
            BUNYAN Materials
          </p>

          <h1>Building Materials</h1>

          <p>
            Browse materials from suppliers for your
            construction and property projects.
          </p>
        </div>

        {user?.role === 'supplier' && (
          <Link
            to="/materials/new"
            className="materials-add-button"
          >
            <span>+</span>
            Add Material
          </Link>
        )}
      </section>

      {message && (
        <p className="materials-message">
          {message}
        </p>
      )}

      {materials.length === 0 ? (
        <section className="materials-empty">
          <div className="materials-empty-number">
            01
          </div>

          <h2>No materials available</h2>

          <p>
            {user?.role === 'supplier'
              ? 'Add your first material to the BUNYAN marketplace.'
              : 'There are no materials available right now.'}
          </p>

          {user?.role === 'supplier' && (
            <Link to="/materials/new">
              Add First Material →
            </Link>
          )}
        </section>
      ) : (
        <section className="materials-grid">
          {materials.map((material, index) => (
            <article
              key={material.id}
              className="material-card"
            >
              <div className="material-card-image">
                {material.image_url ? (
                  <img
                    src={material.image_url}
                    alt={material.name}
                  />
                ) : (
                  <div className="material-card-image-fallback">
                    BUNYAN
                  </div>
                )}
              </div>

              <div className="material-card-top">
                <span className="material-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="material-category">
                  {material.category}
                </span>
              </div>

              <div className="material-card-content">
                <p className="material-label">
                  Building Material
                </p>

                <h2>{material.name}</h2>

                <div className="material-info">
                  <div>
                    <span>Price</span>

                    <strong>
                      {material.price} BHD
                    </strong>
                  </div>

                  <div>
                    <span>Stock</span>

                    <strong>
                      {material.stock_quantity}
                    </strong>
                  </div>
                </div>
              </div>

              <Link
                to={`/materials/${material.id}`}
                className="material-view-link"
              >
                View Material
                <span>→</span>
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Materials;
