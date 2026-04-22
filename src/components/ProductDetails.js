import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const roles = localStorage.getItem('roles');
  const token = localStorage.getItem('jwtToken');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${params.id}`)
      .then(r => r.json())
      .then(data => setProduct(data));
  }, [params.id]);

  function deleteProduct() {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    fetch(`http://localhost:8080/api/products/${params.id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'DELETE'
    }).then(() => { alert('Product deleted.'); navigate('/'); });
  }

  function addToCart() {
    if (!(roles && roles.includes('USER'))) {
      alert('Please login first to shop.');
      navigate('/login');
      return;
    }
    fetch('http://localhost:8080/api/carts', {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      method: 'POST',
      body: JSON.stringify({
        user: `http://localhost:8080/api/users/${userId}`,
        product: `http://localhost:8080/api/products/${params.id}`
      })
    }).then(() => { alert('Added to cart!'); navigate('/'); });
  }

  if (!product) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: '#7B1C1C', fontFamily: 'Hind, sans-serif' }}>
      Loading…
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Hind:wght@300;400;500;600&display=swap');
        body { background: #fdf6ec !important; font-family: 'Hind', sans-serif; }
        .pd-wrap { max-width: 900px; margin: 0 auto; padding: 1.5rem 1rem; }
        .pd-back { background: transparent; border: 1.5px solid #e8d5c5; color: #7B1C1C; border-radius: 8px; padding: .4rem 1rem; font-family: 'Hind', sans-serif; font-size: .83rem; cursor: pointer; margin-bottom: 1.2rem; transition: background .2s; }
        .pd-back:hover { background: #fdf0f0; }
        .pd-card { background: #fff; border-radius: 18px; border: 1.5px solid #f0e0d0; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; box-shadow: 0 6px 24px rgba(123,28,28,.09); }
        .pd-img { width: 100%; height: 380px; object-fit: cover; }
        .pd-body { padding: 2rem 1.8rem; display: flex; flex-direction: column; gap: .8rem; }
        .pd-cat { font-size: .78rem; font-weight: 600; color: #fff; background: #7B1C1C; padding: .2rem .7rem; border-radius: 20px; display: inline-block; }
        .pd-name { font-family: 'Playfair Display', serif; font-size: 1.7rem; color: #2a1a1a; line-height: 1.25; margin: 0; }
        .pd-desc { font-size: .9rem; color: #6a4a3a; line-height: 1.6; }
        .pd-price { font-family: 'Playfair Display', serif; font-size: 2rem; color: #7B1C1C; font-weight: 700; }
        .pd-actions { display: flex; gap: .7rem; flex-wrap: wrap; margin-top: .4rem; }
        .pd-btn { border: none; border-radius: 10px; padding: .65rem 1.3rem; font-family: 'Hind', sans-serif; font-size: .9rem; font-weight: 600; cursor: pointer; transition: all .2s; }
        .pd-btn-cart { background: #7B1C1C; color: #fff; }
        .pd-btn-cart:hover { background: #9b2222; }
        .pd-btn-edit { background: #C9992A; color: #fff; text-decoration: none; display: inline-flex; align-items: center; gap: .3rem; }
        .pd-btn-edit:hover { background: #a87e20; }
        .pd-btn-delete { background: #dc3545; color: #fff; }
        .pd-btn-delete:hover { background: #bb2d3b; }
        @media(max-width: 640px) {
          .pd-card { grid-template-columns: 1fr; }
          .pd-img { height: 240px; }
          .pd-body { padding: 1.3rem; }
          .pd-name { font-size: 1.35rem; }
        }
      `}</style>

      <div className="pd-wrap">
        <button className="pd-back" onClick={() => navigate(-1)}>← Back</button>
        <div className="pd-card">
          <img
            className="pd-img"
            src={product.imageUrl || 'https://via.placeholder.com/500?text=No+Image'}
            alt={product.name}
            onError={e => { e.target.src = 'https://via.placeholder.com/500?text=No+Image'; }}
          />
          <div className="pd-body">
            {product.category && <span className="pd-cat">{product.category}</span>}
            <h1 className="pd-name">{product.name}</h1>
            <p className="pd-desc">{product.description}</p>
            <div className="pd-price">₹ {product.price}</div>
            <div className="pd-actions">
              <button className="pd-btn pd-btn-cart" onClick={addToCart}>
                🛒 Add to Cart
              </button>
              {roles && roles.includes('ADMIN') && (
                <>
                  <NavLink className="pd-btn pd-btn-edit" to={`/update/${params.id}`}>
                    ✏️ Edit
                  </NavLink>
                  <button className="pd-btn pd-btn-delete" onClick={deleteProduct}>
                    🗑 Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}