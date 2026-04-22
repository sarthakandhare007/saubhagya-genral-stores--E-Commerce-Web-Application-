import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Payment() {
  const [cartList, setCartList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const userId = localStorage.getItem('userId');
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

  const { count, subtotal, delivery, total } = useMemo(() => {
    if (!cartList) return { count: 0, subtotal: 0, delivery: 0, total: 0 };
    const sub = cartList.reduce((s, c) => s + c.quantity * c.product.price, 0);
    const del = sub >= 500 ? 0 : 50;
    return { count: cartList.length, subtotal: sub, delivery: del, total: sub + del };
  }, [cartList]);

  const startPayment = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) { alert('Please login first.'); navigate('/login'); return; }

    setPaying(true);
    try {
      const res = await fetch('http://localhost:8080/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ amount: total })
      });
      const data = await res.json();
      if (!res.ok) { alert('Order creation failed: ' + JSON.stringify(data)); setPaying(false); return; }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: 'INR',
        name: 'Saubhagya Still Bhandar',
        description: 'Order Payment',
        order_id: data.orderId,
        handler: async (response) => {
          const vRes = await fetch('http://localhost:8080/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(response)
          });
          if (vRes.ok) {
            navigate('/order-success', { replace: true });
            // fallback if route doesn't exist
            alert('🎉 Order Placed Successfully!');
            navigate('/');
          } else {
            alert('Payment verification failed. Contact support.');
          }
          setPaying(false);
        },
        modal: { ondismiss: () => setPaying(false) },
        prefill: { name: localStorage.getItem('username') || '', email: '', contact: '' },
        theme: { color: '#7B1C1C' }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => { alert('Payment failed. Please try again.'); setPaying(false); });
      rzp.open();
    } catch (err) {
      alert('Something went wrong. Please try again.');
      setPaying(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Hind:wght@300;400;500;600&display=swap');
        body { background: #fdf6ec !important; font-family: 'Hind', sans-serif; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes spin { to { transform: rotate(360deg); } }

        .pay-page { max-width: 1050px; margin: 0 auto; padding: 1.5rem 1rem 3rem; }

        /* Header */
        .pay-header {
          background: linear-gradient(135deg, #7B1C1C, #9B2C1C);
          border-radius: 16px; padding: 1.3rem 1.5rem; color: #fff;
          margin-bottom: 1.5rem;
        }
        .pay-header h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin: 0 0 .2rem; }
        .pay-header p { margin: 0; font-size: .82rem; opacity: .8; }

        /* Steps bar */
        .pay-steps {
          display: flex; align-items: center; gap: 0;
          background: #fff; border-radius: 12px; border: 1.5px solid #f0e0d0;
          padding: .9rem 1.5rem; margin-bottom: 1.5rem; overflow-x: auto;
        }
        .pay-step { display: flex; align-items: center; gap: .4rem; font-size: .82rem; white-space: nowrap; }
        .pay-step-dot {
          width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: .7rem; font-weight: 700; flex-shrink: 0;
        }
        .pay-step-dot.done { background: #198754; color: #fff; }
        .pay-step-dot.active { background: #7B1C1C; color: #fff; }
        .pay-step-dot.pending { background: #f0e0d0; color: #8a6a5a; }
        .pay-step-label.active { color: #7B1C1C; font-weight: 600; }
        .pay-step-label { color: #8a6a5a; }
        .pay-step-sep { flex: 1; min-width: 20px; height: 2px; background: #f0e0d0; margin: 0 .5rem; }

        .pay-layout { display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; align-items: start; }

        /* Item row */
        .pay-item {
          background: #fff; border-radius: 12px; border: 1.5px solid #f0e0d0;
          display: flex; gap: .9rem; padding: .9rem; margin-bottom: .8rem;
          align-items: center; animation: fadeUp .35s ease both;
        }
        .pay-item:hover { border-color: #e8c8a0; }
        .pay-item img { width: 72px; height: 72px; object-fit: cover; border-radius: 8px; background: #fdf6ec; flex-shrink: 0; }
        .pay-item-body { flex: 1; min-width: 0; }
        .pay-item-name { font-weight: 600; font-size: .9rem; color: #2a1a1a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .pay-item-cat { font-size: .72rem; color: #7B1C1C; font-weight: 600; }
        .pay-item-right { text-align: right; flex-shrink: 0; }
        .pay-item-qty { font-size: .78rem; color: #8a6a5a; }
        .pay-item-price { font-family: 'Playfair Display', serif; font-size: 1rem; color: #7B1C1C; font-weight: 700; }

        /* Summary / Payment card */
        .pay-card {
          background: #fff; border-radius: 16px; border: 1.5px solid #f0e0d0;
          padding: 1.5rem; position: sticky; top: 80px;
          box-shadow: 0 4px 16px rgba(123,28,28,.08);
        }
        .pay-card-title { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #2a1a1a; margin: 0 0 1.1rem; }
        .pay-row { display: flex; justify-content: space-between; padding: .5rem 0; border-bottom: 1px solid #f5e8dc; font-size: .86rem; }
        .pay-row:last-of-type { border-bottom: none; }
        .pay-row .lbl { color: #8a6a5a; }
        .pay-row .val { font-weight: 600; color: #2a1a1a; }
        .pay-total-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: .9rem 0 .4rem; margin-top: .3rem;
          border-top: 2px solid #7B1C1C;
        }
        .pay-total-lbl { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #2a1a1a; }
        .pay-total-val { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #7B1C1C; font-weight: 700; }

        .free-tag { background: #d1e7dd; color: #0a3622; border-radius: 5px; padding: .1rem .4rem; font-size: .7rem; font-weight: 700; margin-left: .3rem; }

        .pay-secure {
          background: #fdf6ec; border-radius: 8px; padding: .6rem .8rem;
          margin: .9rem 0; font-size: .76rem; color: #6a4a3a; display: flex; align-items: center; gap: .5rem;
        }

        .btn-pay {
          width: 100%; background: #7B1C1C; color: #fff; border: none;
          border-radius: 12px; padding: .9rem; font-family: 'Hind', sans-serif;
          font-size: 1rem; font-weight: 700; cursor: pointer; transition: all .2s;
          display: flex; align-items: center; justify-content: center; gap: .5rem;
          position: relative; overflow: hidden;
        }
        .btn-pay:not(:disabled):hover { background: #9b2222; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(123,28,28,.25); }
        .btn-pay:disabled { opacity: .7; cursor: not-allowed; }
        .spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,.4); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; }

        .btn-back {
          width: 100%; background: transparent; color: #7B1C1C; border: 1.5px solid #7B1C1C;
          border-radius: 12px; padding: .7rem; font-family: 'Hind', sans-serif;
          font-size: .88rem; font-weight: 600; cursor: pointer; transition: all .2s;
          margin-top: .6rem; text-decoration: none; display: block; text-align: center;
        }
        .btn-back:hover { background: #fdf0f0; }

        /* Razorpay logo strip */
        .rzp-strip { display: flex; align-items: center; justify-content: center; gap: .5rem; margin-top: .9rem; font-size: .72rem; color: #aaa; }

        .skel { background: linear-gradient(90deg,#f5e5e5 25%,#fdf0f0 50%,#f5e5e5 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; border-radius:12px; }

        @media(max-width: 768px) {
          .pay-layout { grid-template-columns: 1fr; }
          .pay-card { position: static; }
        }
      `}</style>

      <div className="pay-page">
        {/* Header */}
        <div className="pay-header">
          <h2>🏦 Checkout</h2>
          <p>Saubhagya Still Bhandar — Secure Payment</p>
        </div>

        {/* Progress Steps */}
        <div className="pay-steps">
          <div className="pay-step">
            <div className="pay-step-dot done">✓</div>
            <span className="pay-step-label">Cart</span>
          </div>
          <div className="pay-step-sep" />
          <div className="pay-step">
            <div className="pay-step-dot active">2</div>
            <span className="pay-step-label active">Review & Pay</span>
          </div>
          <div className="pay-step-sep" />
          <div className="pay-step">
            <div className="pay-step-dot pending">3</div>
            <span className="pay-step-label">Confirmation</span>
          </div>
        </div>

        {loading ? (
          <div className="pay-layout">
            <div>{[1,2,3].map(i => <div key={i} className="skel" style={{ height: 90, marginBottom: '1rem' }} />)}</div>
            <div className="skel" style={{ height: 380 }} />
          </div>
        ) : (
          <div className="pay-layout">
            {/* Items */}
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#7B1C1C', marginBottom: '.9rem' }}>
                📋 Order Items ({count})
              </div>
              {cartList?.map((cart, i) => (
                <div className="pay-item" key={cart.id} style={{ animationDelay: `${i * 0.06}s` }}>
                  <img
                    src={cart.product.imageUrl || 'https://via.placeholder.com/72?text=...'}
                    alt={cart.product.name}
                    onError={e => { e.target.src = 'https://via.placeholder.com/72?text=...'; }}
                  />
                  <div className="pay-item-body">
                    <div className="pay-item-name">{cart.product.name}</div>
                    <div className="pay-item-cat">{cart.product.category}</div>
                    {cart.product.description && (
                      <div style={{ fontSize: '.75rem', color: '#aaa', marginTop: '.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {cart.product.description}
                      </div>
                    )}
                  </div>
                  <div className="pay-item-right">
                    <div className="pay-item-qty">Qty: {cart.quantity}</div>
                    <div className="pay-item-price">₹ {(cart.product.price * cart.quantity).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="pay-card">
              <h3 className="pay-card-title">Payment Summary</h3>

              <div className="pay-row">
                <span className="lbl">Subtotal ({count} items)</span>
                <span className="val">₹ {subtotal.toLocaleString()}</span>
              </div>
              <div className="pay-row">
                <span className="lbl">Delivery</span>
                <span className="val" style={{ color: delivery === 0 ? '#198754' : undefined }}>
                  {delivery === 0 ? <>FREE <span className="free-tag">🎉</span></> : `₹ ${delivery}`}
                </span>
              </div>
              {subtotal < 500 && (
                <div style={{ fontSize: '.74rem', color: '#8a6a5a', paddingBottom: '.4rem', borderBottom: '1px solid #f5e8dc' }}>
                  Add ₹{500 - subtotal} more for free delivery
                </div>
              )}

              <div className="pay-total-row">
                <span className="pay-total-lbl">Total Amount</span>
                <span className="pay-total-val">₹ {total.toLocaleString()}</span>
              </div>

              <div className="pay-secure">
                 Secured by Razorpay · 256-bit SSL encryption
              </div>

              <button
                className="btn-pay"
                onClick={startPayment}
                disabled={paying || !cartList?.length}
              >
                {paying ? (
                  <><div className="spinner" /> Processing…</>
                ) : (
                  <>💳 Pay ₹ {total.toLocaleString()}</>
                )}
              </button>

              <NavLink to="/mycart" className="btn-back">← Edit Cart</NavLink>

              <div className="rzp-strip">
                <span></span> Safe &amp; Secure Checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}