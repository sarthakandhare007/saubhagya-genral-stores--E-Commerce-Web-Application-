import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── PERSISTENT KEY ── never tied to session/login ──────────────────────────
const STORAGE_KEY = 'saubhagya_admin_book_v1';

// ✅ FIX 1: Moved OUTSIDE component — these never change, no need to recreate
const EMPTY_BORROW = { customerName: '', mobile: '', quantity: 1, amount: 0 };

const inputStyle = {
  width: '100%', padding: '0.6rem 0.9rem',
  border: '1.5px solid #E8E0D8', borderRadius: '8px',
  fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem',
  outline: 'none', boxSizing: 'border-box',
};

//FIX 2: Moved OUTSIDE component — static CSS string recreated on every render was causing lag
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Nunito:wght@400;600;700;800&display=swap');

  .ab-wrap { max-width: 960px; margin: 0 auto; padding: 1.25rem 1rem; font-family: 'Nunito', sans-serif; }
  .ab-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem; }
  .ab-title { font-family: 'Rozha One', serif; font-size: 1.7rem; color: #1C2B3A; margin: 0; }

  /* STATS */
  .ab-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.75rem; }
  .stat-card { background: #fff; border-radius: 14px; padding: 1.1rem 1rem; box-shadow: 0 2px 10px rgba(28,43,58,0.08); border: 1.5px solid #E8E0D8; text-align: center; }
  .stat-icon { font-size: 1.6rem; margin-bottom: 0.3rem; }
  .stat-val { font-size: 1.3rem; font-weight: 800; color: #1C2B3A; line-height: 1.1; }
  .stat-val.pending { color: #E53E3E; }
  .stat-val.paid { color: #2F855A; }
  .stat-lbl { font-size: 0.72rem; color: #718096; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 0.2rem; }

  /* TABS */
  .ab-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; border-bottom: 2px solid #E8E0D8; padding-bottom: 0; }
  .ab-tab { padding: 0.55rem 1.1rem; border: none; background: none; font-family: 'Nunito', sans-serif; font-size: 0.88rem; font-weight: 700; color: #718096; cursor: pointer; border-bottom: 2.5px solid transparent; margin-bottom: -2px; border-radius: 0; transition: color 0.2s; }
  .ab-tab.active { color: #D4821A; border-bottom-color: #D4821A; }
  .ab-tab:hover:not(.active) { color: #1C2B3A; }

  /* CARDS */
  .ab-card { background: #fff; border-radius: 14px; border: 1.5px solid #E8E0D8; box-shadow: 0 2px 10px rgba(28,43,58,0.06); overflow: hidden; margin-bottom: 1rem; }
  .ab-card-header { background: #1C2B3A; padding: 0.75rem 1.25rem; display: flex; align-items: center; justify-content: space-between; }
  .ab-card-header h5 { font-family: 'Rozha One', serif; color: #fff; margin: 0; font-size: 1rem; }

  /* TABLE */
  .ab-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
  .ab-table th { background: #F5F0EA; color: #1C2B3A; font-weight: 700; padding: 0.65rem 0.85rem; text-align: left; border-bottom: 2px solid #E8E0D8; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.04em; }
  .ab-table td { padding: 0.65rem 0.85rem; border-bottom: 1px solid #F0EAE3; vertical-align: middle; color: #2D3748; }
  .ab-table tr:last-child td { border-bottom: none; }
  .ab-table tr:hover td { background: #FDF8F3; }

  /* BADGES */
  .badge-pending { background: #FFF5F5; color: #E53E3E; border: 1px solid #FEB2B2; padding: 3px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; }
  .badge-paid { background: #F0FFF4; color: #2F855A; border: 1px solid #9AE6B4; padding: 3px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; }

  /* BUTTONS */
  .btn-paid { background: #D4821A; color: #fff; border: none; padding: 4px 12px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; }
  .btn-paid:hover { background: #B86A10; }
  .btn-wa { background: #25D366; color: #fff; border: none; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; }
  .btn-wa:hover { background: #1AAE52; }
  .btn-edit { background: #EBF4FF; color: #2B6CB0; border: 1px solid #BEE3F8; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; }
  .btn-edit:hover { background: #2B6CB0; color: #fff; }
  .btn-del { background: #FFF5F5; color: #E53E3E; border: 1px solid #FEB2B2; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; }
  .btn-del:hover { background: #E53E3E; color: #fff; }
  .btn-borrow { background: #D4821A; color: #fff; border: none; padding: 5px 14px; border-radius: 7px; font-size: 0.82rem; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; }
  .btn-borrow:hover { background: #B86A10; }
  .btn-cust { background: none; border: none; color: #D4821A; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 0.88rem; cursor: pointer; padding: 4px 0; text-decoration: underline; }
  .btn-cust:hover { color: #B86A10; }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(28,43,58,0.55); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem; }
  .modal-box { background: #fff; border-radius: 16px; padding: 1.75rem; width: 100%; max-width: 440px; box-shadow: 0 16px 48px rgba(28,43,58,0.25); }
  .modal-box h4 { font-family: 'Rozha One', serif; color: #1C2B3A; margin: 0 0 0.25rem; font-size: 1.2rem; }
  .modal-subtitle { font-size: 0.83rem; color: #718096; margin-bottom: 1.1rem; }
  .modal-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
  .btn-save { flex: 1; background: #D4821A; color: #fff; border: none; padding: 0.65rem; border-radius: 8px; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 0.95rem; cursor: pointer; }
  .btn-save:hover { background: #B86A10; }
  .btn-cancel { flex: 1; background: #F5F0EA; color: #1C2B3A; border: none; padding: 0.65rem; border-radius: 8px; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 0.95rem; cursor: pointer; }
  .mobile-tag { font-size: 0.75rem; color: #718096; }

  .empty-state { text-align: center; padding: 2.5rem; color: #718096; }
  .empty-state span { font-size: 2.5rem; display: block; margin-bottom: 0.5rem; }
  .action-row { display: flex; gap: 0.4rem; flex-wrap: wrap; }

  @media(max-width:600px){ .ab-stats{ grid-template-columns: repeat(2,1fr); } .ab-tabs{ flex-wrap:wrap; } }
`;

// FIX 3: localStorage helpers outside component

const loadData = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
};
const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// ✅ FIX 4: Field component outside main component — prevents recreation on every render
const Field = ({ label, children }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1C2B3A', display: 'block', marginBottom: '0.3rem' }}>
      {label}
    </label>
    {children}
  </div>
);

export default function AdminBook() {
  const [products, setProducts] = useState([]);
  const [adminData, setAdminData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [borrowMode, setBorrowMode] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [activeTab, setActiveTab] = useState('records');
  const navigate = useNavigate();

  const [borrowData, setBorrowData] = useState(EMPTY_BORROW);
  const [editData, setEditData] = useState(EMPTY_BORROW);

  //FIX 5:Inject styles once only via useEffect — not on every render
  
  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'adminbook-styles';
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => { document.getElementById('adminbook-styles')?.remove(); };
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => setProducts(data._embedded?.products || []))
      .catch(() => {});
    setAdminData(loadData());
  }, []);

  const getStock = useCallback((productId) => adminData[productId]?.stock ?? 0, [adminData]);

  // ✅ FIX 6: useCallback on all handlers — prevents child re-renders
  const handleBorrowSave = useCallback(() => {
    if (!selectedProduct) return;
    if (!borrowData.customerName.trim()) return alert('Please enter customer name');
    if (!borrowData.mobile.trim() || !/^\d{10}$/.test(borrowData.mobile.trim()))
      return alert('Please enter a valid 10-digit mobile number');
    if (borrowData.quantity < 1) return alert('Quantity must be at least 1');
    if (borrowData.amount < 0) return alert('Amount cannot be negative');

    const updated = { ...adminData };
    const productData = updated[selectedProduct.id] || { stock: 0, borrowRecords: [] };
    const newBorrow = {
      customerName: borrowData.customerName.trim(),
      mobile: borrowData.mobile.trim(),
      quantity: Number(borrowData.quantity),
      amount: Number(borrowData.amount),
      status: 'PENDING',
      date: new Date().toISOString(),
    };
    productData.stock = Math.max(0, (productData.stock || 0) - newBorrow.quantity);
    productData.borrowRecords = [...(productData.borrowRecords || []), newBorrow];
    updated[selectedProduct.id] = productData;
    saveData(updated);
    setAdminData(updated);
    setBorrowMode(false);
    setBorrowData(EMPTY_BORROW);
    setSelectedProduct(null);
  }, [selectedProduct, borrowData, adminData]);

  const handleEditSave = useCallback(() => {
    if (!editData.customerName.trim()) return alert('Customer name required');
    if (!editData.mobile.trim() || !/^\d{10}$/.test(editData.mobile.trim()))
      return alert('Please enter a valid 10-digit mobile number');
    if (editData.quantity < 1) return alert('Quantity must be at least 1');
    if (editData.amount < 0) return alert('Amount cannot be negative');

    const updated = JSON.parse(JSON.stringify(adminData));
    const rec = updated[editMode.productId]?.borrowRecords?.[editMode.index];
    if (!rec) return;
    rec.customerName = editData.customerName.trim();
    rec.mobile = editData.mobile.trim();
    rec.quantity = Number(editData.quantity);
    rec.amount = Number(editData.amount);
    saveData(updated);
    setAdminData(updated);
    setEditMode(null);
  }, [editData, adminData, editMode]);

  const openEdit = useCallback((b) => {
    setEditData({
      customerName: b.customerName,
      mobile: b.mobile || '',
      quantity: b.quantity,
      amount: b.amount,
    });
    setEditMode({ productId: b._productId, index: b._index });
  }, []);

  const markAsPaid = useCallback((productId, index) => {
    const updated = JSON.parse(JSON.stringify(adminData));
    if (!updated[productId]?.borrowRecords?.[index]) return;
    updated[productId].borrowRecords[index].status = 'PAID';
    saveData(updated);
    setAdminData(updated);
  }, [adminData]);

  const deleteRecord = useCallback((productId, index) => {
    if (!window.confirm('Delete this record?')) return;
    const updated = JSON.parse(JSON.stringify(adminData));
    updated[productId].borrowRecords.splice(index, 1);
    saveData(updated);
    setAdminData(updated);
  }, [adminData]);

  const sendWhatsApp = useCallback((b) => {
    const productName = products.find(p => String(p.id) === String(b._productId))?.name || 'item';
    const msg = `Namaskar ${b.customerName} ji 🙏\n\nYour pending amount for *${productName}* is ₹${b.amount}.\n\nPlease clear the payment at your earliest convenience.\n\n— Saubhagya Still Bhandar, Dangsaundane`;
    const mobile = b.mobile ? `91${b.mobile}` : '';
    const url = mobile
      ? `https://wa.me/${mobile}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }, [products]);

  // ✅ FIX 7: useMemo for expensive derived data — not recomputed on every render
  const stats = useMemo(() => {
    let pending = 0, paid = 0;
    const customers = new Set();
    let totalRecords = 0;
    Object.values(adminData).forEach(p => {
      (p.borrowRecords || []).forEach(b => {
        customers.add(b.customerName);
        totalRecords++;
        if (b.status === 'PENDING') pending += Number(b.amount);
        else paid += Number(b.amount);
      });
    });
    return { pending, paid, customers: customers.size, totalRecords };
  }, [adminData]);

  const customers = useMemo(() => {
    const map = {};
    Object.entries(adminData).forEach(([pid, pdata]) => {
      (pdata.borrowRecords || []).forEach(b => {
        if (!map[b.customerName]) map[b.customerName] = [];
        map[b.customerName].push({
          ...b,
          _productId: pid,
          productName: products.find(p => String(p.id) === String(pid))?.name || 'Unknown',
        });
      });
    });
    return map;
  }, [adminData, products]);

  const allRecords = useMemo(() => {
    const records = [];
    Object.entries(adminData).forEach(([pid, pdata]) => {
      (pdata.borrowRecords || []).forEach((b, i) => {
        records.push({
          ...b,
          _productId: pid,
          _index: i,
          productName: products.find(p => String(p.id) === String(pid))?.name || 'Unknown',
        });
      });
    });
    return records.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [adminData, products]);

  const pendingRecords = useMemo(() => allRecords.filter(r => r.status === 'PENDING'), [allRecords]);

  //  Stable onChange handlers using functional updater — no stale closures
  const handleBorrowChange = useCallback((field) => (e) => {
    const val = field === 'mobile' ? e.target.value.replace(/\D/g, '') : e.target.value;
    setBorrowData(prev => ({ ...prev, [field]: val }));
  }, []);

  const handleEditChange = useCallback((field) => (e) => {
    const val = field === 'mobile' ? e.target.value.replace(/\D/g, '') : e.target.value;
    setEditData(prev => ({ ...prev, [field]: val }));
  }, []);

  return (
    <>
      <div className="ab-wrap">
        {/* Header */}
        <div className="ab-header">
          <h2 className="ab-title">📒 Admin Book</h2>
          <span style={{ fontSize: '0.82rem', color: '#718096', fontWeight: 600 }}>Saubhagya Still Bhandar</span>
        </div>

        {/* Stats */}
        <div className="ab-stats">
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-val pending">₹{stats.pending.toLocaleString('en-IN')}</div>
            <div className="stat-lbl">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-val paid">₹{stats.paid.toLocaleString('en-IN')}</div>
            <div className="stat-lbl">Collected</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-val">{stats.customers}</div>
            <div className="stat-lbl">Customers</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-val">{stats.totalRecords}</div>
            <div className="stat-lbl">Total Records</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="ab-tabs">
          <button className={`ab-tab ${activeTab === 'records' ? 'active' : ''}`} onClick={() => setActiveTab('records')}>
            📋 Records ({pendingRecords.length} pending)
          </button>
          <button className={`ab-tab ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>
            👥 Customers ({Object.keys(customers).length})
          </button>
          <button className={`ab-tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            📦 Products
          </button>
        </div>

        {/* ── Tab: Records ── */}
        {activeTab === 'records' && (
          <div className="ab-card">
            <div className="ab-card-header"><h5>📋 All Borrow Records</h5></div>
            <div style={{ overflowX: 'auto' }}>
              {allRecords.length === 0 ? (
                <div className="empty-state"><span>📭</span>No borrow records yet</div>
              ) : (
                <table className="ab-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Mobile</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRecords.map((b, i) => (
                      <tr key={i}>
                        <td><strong>{b.customerName}</strong></td>
                        <td className="mobile-tag">{b.mobile || '—'}</td>
                        <td>{b.productName}</td>
                        <td>{b.quantity}</td>
                        <td><strong>₹{Number(b.amount).toLocaleString('en-IN')}</strong></td>
                        <td style={{ fontSize: '0.78rem', color: '#718096' }}>{new Date(b.date).toLocaleDateString('en-IN')}</td>
                        <td><span className={b.status === 'PENDING' ? 'badge-pending' : 'badge-paid'}>{b.status}</span></td>
                        <td>
                          <div className="action-row">
                            {b.status === 'PENDING' && (
                              <>
                                <button className="btn-paid" onClick={() => markAsPaid(b._productId, b._index)}>✓ Paid</button>
                                <button className="btn-wa" onClick={() => sendWhatsApp(b)} title={b.mobile ? `Send to ${b.mobile}` : 'No number — opens share'}>
                                  💬 WA{b.mobile ? ` →${b.mobile.slice(-4)}` : ''}
                                </button>
                              </>
                            )}
                            <button className="btn-edit" onClick={() => openEdit(b)}>✏️</button>
                            <button className="btn-del" onClick={() => deleteRecord(b._productId, b._index)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ── Tab: Customers ── */}
        {activeTab === 'customers' && (
          <div className="ab-card">
            <div className="ab-card-header"><h5>👥 Customer Summary</h5></div>
            <div style={{ overflowX: 'auto' }}>
              {Object.keys(customers).length === 0 ? (
                <div className="empty-state"><span>👤</span>No customers yet</div>
              ) : (
                <table className="ab-table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Mobile</th>
                      <th>Total Orders</th>
                      <th>Pending Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(customers).map(([name, records]) => {
                      const pendingAmt = records.filter(r => r.status === 'PENDING').reduce((s, r) => s + Number(r.amount), 0);
                      const mobile = records.find(r => r.mobile)?.mobile || '';
                      return (
                        <tr key={name}>
                          <td><strong>{name}</strong></td>
                          <td className="mobile-tag">{mobile || '—'}</td>
                          <td>{records.length}</td>
                          <td>
                            {pendingAmt > 0
                              ? <span className="badge-pending">₹{pendingAmt.toLocaleString('en-IN')}</span>
                              : <span className="badge-paid">Clear ✓</span>
                            }
                          </td>
                          <td>
                            <div className="action-row">
                              <button className="btn-cust" onClick={() => navigate('/customer-ledger', { state: { customerName: name, records } })}>
                                View Ledger →
                              </button>
                              {mobile && pendingAmt > 0 && (
                                <button className="btn-wa"
                                  onClick={() => {
                                    const msg = `Namaskar ${name} ji 🙏\n\nYour total pending amount is ₹${pendingAmt}.\n\nPlease clear the payment at your earliest convenience.\n\n— Saubhagya Still Bhandar, Dangsaundane`;
                                    window.open(`https://wa.me/91${mobile}?text=${encodeURIComponent(msg)}`, '_blank');
                                  }}
                                >
                                  💬 Remind
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ── Tab: Products ── */}
        {activeTab === 'products' && (
          <div className="ab-card">
            <div className="ab-card-header"><h5>📦 Product Stock & Borrow</h5></div>
            <div style={{ overflowX: 'auto' }}>
              <table className="ab-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Borrowed Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td><strong>{p.name}</strong></td>
                      <td style={{ fontSize: '0.78rem', color: '#6B8FA3' }}>{p.category}</td>
                      <td>₹{p.price}</td>
                      <td>{getStock(p.id)} units</td>
                      <td>
                        <button className="btn-borrow" onClick={() => { setSelectedProduct(p); setBorrowMode(true); }}>
                          + Add Borrow
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── Borrow Modal ── */}
      {borrowMode && selectedProduct && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setBorrowMode(false)}>
          <div className="modal-box">
            <h4>+ Add Borrow Record</h4>
            <p className="modal-subtitle">Product: <strong style={{ color: '#1C2B3A' }}>{selectedProduct.name}</strong></p>

            <Field label="Customer Name *">
              <input
                style={inputStyle}
                placeholder="Enter customer name"
                value={borrowData.customerName}
                onChange={handleBorrowChange('customerName')}
              />
            </Field>

            <Field label="Mobile Number * (10 digits)">
              <input
                style={inputStyle}
                placeholder="e.g. 9876543210"
                maxLength={10}
                inputMode="numeric"
                value={borrowData.mobile}
                onChange={handleBorrowChange('mobile')}
              />
            </Field>

            <Field label="Quantity">
              <input
                style={inputStyle}
                type="number"
                min="1"
                placeholder="Quantity"
                value={borrowData.quantity}
                onChange={handleBorrowChange('quantity')}
              />
            </Field>

            <Field label="Amount (₹)">
              <input
                style={inputStyle}
                type="number"
                min="0"
                placeholder="Amount in ₹"
                value={borrowData.amount}
                onChange={handleBorrowChange('amount')}
              />
            </Field>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => { setBorrowMode(false); setSelectedProduct(null); setBorrowData(EMPTY_BORROW); }}>Cancel</button>
              <button className="btn-save" onClick={handleBorrowSave}>Save Record</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editMode && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setEditMode(null)}>
          <div className="modal-box">
            <h4>✏️ Edit Record</h4>
            <p className="modal-subtitle">Update customer or amount details</p>

            <Field label="Customer Name *">
              <input
                style={inputStyle}
                placeholder="Customer name"
                value={editData.customerName}
                onChange={handleEditChange('customerName')}
              />
            </Field>

            <Field label="Mobile Number * (10 digits)">
              <input
                style={inputStyle}
                placeholder="e.g. 9876543210"
                maxLength={10}
                inputMode="numeric"
                value={editData.mobile}
                onChange={handleEditChange('mobile')}
              />
            </Field>

            <Field label="Quantity">
              <input
                style={inputStyle}
                type="number"
                min="1"
                value={editData.quantity}
                onChange={handleEditChange('quantity')}
              />
            </Field>

            <Field label="Amount (₹)">
              <input
                style={inputStyle}
                type="number"
                min="0"
                value={editData.amount}
                onChange={handleEditChange('amount')}
              />
            </Field>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setEditMode(null)}>Cancel</button>
              <button className="btn-save" onClick={handleEditSave}>Update Record</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}