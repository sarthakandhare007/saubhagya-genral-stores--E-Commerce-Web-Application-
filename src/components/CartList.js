import { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function CartList() {
  const [cartList, setCartList] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) { navigate('/login'); return; }
    fetch(`http://localhost:8080/api/users/${userId}/cartList`)
      .then(r => r.json())
      .then(data => {
        setCartList(data._embedded?.carts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  const { count, total } = useMemo(() => {
    if (!cartList) return { count: 0, total: 0 };
    return {
      count: cartList.length,
      total: cartList.reduce((s, c) => s + c.quantity * c.product.price, 0)
    };
  }, [cartList]);

  function deleteCart(id) {
    fetch(`http://localhost:8080/api/carts/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'DELETE'
    }).then(r => {
      if (r.ok) setCartList(prev => prev.filter(c => c.id !== id));
    });
  }

  function updateQuantity(e, cart) {
    const q = Math.max(1, parseInt(e.target.value) || 1);
    fetch(`http://localhost:8080/api/carts/${cart.id}`, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      method: 'PUT',
      body: JSON.stringify({
        user: `http://localhost:8080/api/users/${userId}`,
        product: `http://localhost:8080/api/products/${cart.product.id}`,
        quantity: q
      })
    }).then(r => {
      if (r.ok) setCartList(prev => prev.map(c => c.id === cart.id ? { ...c, quantity: q } : c));
    });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Hind:wght@300;400;500;600&display=swap');
        body { background: #fdf6ec !important; font-family: 'Hind', sans-serif; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        .cart-page { max-width: 1100px; margin: 0 auto; padding: 1.5rem 1rem 3rem; }

        .cart-header {
          background: linear-gradient(135deg, #7B1C1C, #9B2C1C);
          border-radius: 16px; padding: 1.3rem 1.5rem; color: #fff;
          margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem;
        }
        .cart-header-icon { font-size: 2.2rem; }
        .cart-header h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin: 0; }
        .cart-header p { margin: 0; font-size: .82rem; opacity: .8; }

        .cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; align-items: start; }

        /* Cart Item Card */
        .cart-item {
          background: #fff; border-radius: 14px; border: 1.5px solid #f0e0d0;
          display: grid; grid-template-columns: 130px 1fr; overflow: hidden;
          margin-bottom: 1rem; transition: box-shadow .2s;
          animation: fadeUp .35s ease both;
        }
        .cart-item:hover { box-shadow: 0 6px 20px rgba(123,28,28,.1); }
        .cart-item-img {
          width: 100%; height: 140px; object-fit: cover;
          background: #fdf6ec;
        }
        .cart-item-body { padding: 1rem 1.2rem; display: flex; flex-direction: column; gap: .35rem; }
        .cart-item-cat { font-size: .72rem; font-weight: 600; color: #fff; background: #7B1C1C; padding: .15rem .55rem; border-radius: 20px; display: inline-block; width: fit-content; }
        .cart-item-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: #2a1a1a; line-height: 1.3; }
        .cart-item-desc { font-size: .78rem; color: #8a6a5a; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .cart-item-price { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: #7B1C1C; font-weight: 700; }
        .cart-item-footer { display: flex; align-items: center; gap: .7rem; margin-top: .3rem; flex-wrap: wrap; }

        .qty-control {
          display: flex; align-items: center; gap: 0;
          border: 1.5px solid #e8d5c5; border-radius: 9px; overflow: hidden;
          background: #fdf6ec;
        }
        .qty-btn {
          background: transparent; border: none; width: 32px; height: 32px;
          font-size: 1.1rem; cursor: pointer; color: #7B1C1C; font-weight: 700;
          transition: background .15s; display: flex; align-items: center; justify-content: center;
        }
        .qty-btn:hover { background: #f5e0e0; }
        .qty-input {
          width: 40px; text-align: center; border: none; border-left: 1px solid #e8d5c5; border-right: 1px solid #e8d5c5;
          background: #fff; font-family: 'Hind', sans-serif; font-size: .9rem; font-weight: 600;
          color: #2a1a1a; outline: none; padding: .2rem 0; height: 32px;
          -moz-appearance: textfield;
        }
        .qty-input::-webkit-outer-spin-button, .qty-input::-webkit-inner-spin-button { -webkit-appearance: none; }

        .cart-subtotal { font-size: .82rem; color: #8a6a5a; margin-left: auto; }
        .cart-subtotal strong { color: #2a1a1a; }

        .btn-delete {
          background: transparent; border: 1.5px solid #f5c0c0; color: #dc3545;
          border-radius: 8px; padding: .28rem .7rem; font-family: 'Hind', sans-serif;
          font-size: .78rem; font-weight: 600; cursor: pointer; transition: all .2s;
        }
        .btn-delete:hover { background: #fde8e8; border-color: #dc3545; }

        /* Summary Card */
        .summary-card {
          background: #fff; border-radius: 16px; border: 1.5px solid #f0e0d0;
          padding: 1.5rem; position: sticky; top: 80px;
          box-shadow: 0 4px 16px rgba(123,28,28,.08);
        }
        .summary-title { font-family: 'Playfair Display', serif; font-size: 1.25rem; color: #2a1a1a; margin: 0 0 1.2rem; }
        .summary-row { display: flex; justify-content: space-between; align-items: center; padding: .55rem 0; border-bottom: 1px solid #f5e8dc; font-size: .88rem; }
        .summary-row:last-of-type { border-bottom: none; }
        .summary-row .label { color: #8a6a5a; }
        .summary-row .value { font-weight: 600; color: #2a1a1a; }
        .summary-total {
          display: flex; justify-content: space-between; align-items: center;
          padding: .9rem 0 .4rem; margin-top: .3rem;
          border-top: 2px solid #7B1C1C;
        }
        .summary-total .label { font-family: 'Playfair Display', serif; font-size: 1rem; color: #2a1a1a; font-weight: 700; }
        .summary-total .value { font-family: 'Playfair Display', serif; font-size: 1.35rem; color: #7B1C1C; font-weight: 700; }

        .free-delivery {
          background: #d1e7dd; color: #0a3622; border-radius: 8px;
          padding: .45rem .8rem; font-size: .78rem; font-weight: 600;
          margin: .7rem 0; text-align: center;
        }

        .btn-checkout {
          width: 100%; background: #7B1C1C; color: #fff; border: none;
          border-radius: 12px; padding: .85rem; font-family: 'Hind', sans-serif;
          font-size: .96rem; font-weight: 600; cursor: pointer; transition: background .2s;
          margin-top: .8rem; display: flex; align-items: center; justify-content: center; gap: .4rem;
        }
        .btn-checkout:hover { background: #9b2222; }
        .btn-continue {
          width: 100%; background: transparent; color: #7B1C1C; border: 1.5px solid #7B1C1C;
          border-radius: 12px; padding: .7rem; font-family: 'Hind', sans-serif;
          font-size: .86rem; font-weight: 600; cursor: pointer; transition: all .2s;
          margin-top: .6rem; text-decoration: none; display: block; text-align: center;
        }
        .btn-continue:hover { background: #fdf0f0; }

        /* Empty state */
        .cart-empty {
          grid-column: 1/-1; text-align: center; padding: 4rem 1rem;
          background: #fff; border-radius: 16px; border: 1.5px solid #f0e0d0;
        }
        .cart-empty-icon { font-size: 4rem; display: block; }
        .cart-empty h3 { font-family: 'Playfair Display', serif; color: #7B1C1C; font-size: 1.4rem; margin: .7rem 0 .4rem; }
        .cart-empty p { color: #8a6a5a; font-size: .9rem; }

        /* Skeleton */
        .skel { background: linear-gradient(90deg,#f5e5e5 25%,#fdf0f0 50%,#f5e5e5 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; border-radius:14px; }

        @media(max-width: 768px) {
          .cart-layout { grid-template-columns: 1fr; }
          .summary-card { position: static; }
          .cart-item { grid-template-columns: 100px 1fr; }
          .cart-item-img { height: 120px; }
        }
        @media(max-width: 480px) {
          .cart-item { grid-template-columns: 1fr; }
          .cart-item-img { height: 180px; width: 100%; }
        }
      `}</style>

      <div className="cart-page">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-icon">🛒</div>
          <div>
            <h2>My Cart</h2>
            <p>{count} item{count !== 1 ? 's' : ''} in your cart</p>
          </div>
        </div>

        {loading ? (
          <div className="cart-layout">
            <div>
              {[1, 2, 3].map(i => <div key={i} className="skel" style={{ height: 140, marginBottom: '1rem' }} />)}
            </div>
            <div className="skel" style={{ height: 320 }} />
          </div>
        ) : !cartList || cartList.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started</p>
            <NavLink to="/" className="btn-continue" style={{ display: 'inline-block', width: 'auto', padding: '.6rem 1.5rem', marginTop: '.8rem' }}>
              Browse Products →
            </NavLink>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items */}
            <div>
              {cartList.map((cart, idx) => (
                <div className="cart-item" key={cart.id} style={{ animationDelay: `${idx * 0.07}s` }}>
                  <img
                    className="cart-item-img"
                    src={cart.product.imageUrl || 'https://via.placeholder.com/130x140?text=No+Image'}
                    alt={cart.product.name}
                    onError={e => { e.target.src = 'https://via.placeholder.com/130x140?text=No+Image'; }}
                  />
                  <div className="cart-item-body">
                    {cart.product.category && <span className="cart-item-cat">{cart.product.category}</span>}
                    <div className="cart-item-name">{cart.product.name}</div>
                    {cart.product.description && (
                      <div className="cart-item-desc">{cart.product.description}</div>
                    )}
                    <div className="cart-item-price">₹ {cart.product.price}</div>
                    <div className="cart-item-footer">
                      {/* Quantity stepper */}
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity({ target: { value: cart.quantity - 1 } }, cart)}
                          disabled={cart.quantity <= 1}
                        >−</button>
                        <input
                          type="number"
                          className="qty-input"
                          min="1"
                          value={cart.quantity}
                          onChange={e => updateQuantity(e, cart)}
                        />
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity({ target: { value: cart.quantity + 1 } }, cart)}
                        >+</button>
                      </div>

                      <div className="cart-subtotal">
                        Subtotal: <strong>₹ {(cart.product.price * cart.quantity).toLocaleString()}</strong>
                      </div>

                      <button className="btn-delete" onClick={() => deleteCart(cart.id)}>
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>

              <div className="summary-row">
                <span className="label">Items ({count})</span>
                <span className="value">₹ {total.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span className="label">Delivery</span>
                <span className="value" style={{ color: total >= 500 ? '#198754' : undefined }}>
                  {total >= 500 ? 'FREE' : '₹ 50'}
                </span>
              </div>

              {total >= 500 && (
                <div className="free-delivery">🎉 You qualify for free delivery!</div>
              )}
              {total < 500 && (
                <div style={{ fontSize: '.75rem', color: '#8a6a5a', padding: '.3rem 0' }}>
                  Add ₹{500 - total} more for free delivery
                </div>
              )}

              <div className="summary-total">
                <span className="label">Total</span>
                <span className="value">₹ {(total + (total >= 500 ? 0 : 50)).toLocaleString()}</span>
              </div>

              <NavLink to="/payment" className="btn-checkout" style={{ textDecoration: 'none' }}>
                Proceed to Payment →
              </NavLink>
              <NavLink to="/" className="btn-continue">← Continue Shopping</NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
}