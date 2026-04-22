import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Product({ prod: product }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        .prod-card {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          border: 1.5px solid #E8E0D8;
          box-shadow: 0 2px 8px rgba(28,43,58,0.07);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          font-family: 'Nunito', sans-serif;
          height: 100%;
        }
        .prod-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 32px rgba(212,130,26,0.18);
          border-color: #D4821A;
        }
        .prod-img-wrap {
          position: relative;
          background: #F5F0EA;
          overflow: hidden;
          aspect-ratio: 1;
        }
        .prod-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .prod-card:hover .prod-img-wrap img { transform: scale(1.06); }
        .prod-cat-badge {
          position: absolute;
          top: 10px; left: 10px;
          background: rgba(28,43,58,0.78);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          backdrop-filter: blur(4px);
        }
        .prod-body {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .prod-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1C2B3A;
          margin-bottom: 0.35rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .prod-desc {
          font-size: 0.8rem;
          color: #718096;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.45;
          flex: 1;
        }
        .prod-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .prod-price {
          font-size: 1.15rem;
          font-weight: 800;
          color: #D4821A;
        }
        .prod-price span {
          font-size: 0.75rem;
          font-weight: 600;
          color: #718096;
          margin-right: 1px;
        }
        .prod-details-btn {
          background: #1C2B3A !important;
          color: #fff !important;
          font-family: 'Nunito', sans-serif !important;
          font-size: 0.8rem !important;
          font-weight: 700 !important;
          padding: 0.42rem 0.9rem !important;
          border-radius: 8px !important;
          text-decoration: none !important;
          border: none !important;
          transition: background 0.2s !important;
          white-space: nowrap;
        }
        .prod-details-btn:hover { background: #D4821A !important; }
        .prod-img-placeholder {
          width: 100%; aspect-ratio: 1;
          background: linear-gradient(135deg, #E8E0D8, #F5F0EA);
          display: flex; align-items: center; justify-content: center;
          font-size: 3rem;
        }
      `}</style>

      <div className="prod-card">
        <div className="prod-img-wrap">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling?.style && (e.target.nextSibling.style.display = 'flex');
              }}
            />
          ) : null}
          <div className="prod-img-placeholder" style={{ display: product.imageUrl ? 'none' : 'flex' }}>
            🥘
          </div>
          {product.category && (
            <span className="prod-cat-badge">{product.category}</span>
          )}
        </div>
        <div className="prod-body">
          <div className="prod-name">{product.name}</div>
          <div className="prod-desc">
            {product.description ? product.description.substring(0, 80) : 'Quality steel product'}
          </div>
          <div className="prod-footer">
            <div className="prod-price">
              <span>₹</span>{product.price?.toLocaleString('en-IN') || '0'}
            </div>
            <NavLink to={`/details/${product.id}`} className="prod-details-btn">
              View →
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}