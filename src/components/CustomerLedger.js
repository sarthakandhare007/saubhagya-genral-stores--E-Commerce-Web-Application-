import { useLocation, useNavigate } from 'react-router-dom';

export default function CustomerLedger() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { customerName, records } = state || { customerName: '', records: [] };

  const totalPending = records.filter(r => r.status === 'PENDING').reduce((s, r) => s + Number(r.amount), 0);
  const totalPaid = records.filter(r => r.status === 'PAID').reduce((s, r) => s + Number(r.amount), 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Hind:wght@300;400;500;600&display=swap');
        body { background: #fdf6ec !important; font-family: 'Hind', sans-serif; }
        .cl-wrap { max-width: 750px; margin: 0 auto; padding: 1.5rem 1rem 3rem; }
        .cl-header {
          background: linear-gradient(135deg, #7B1C1C, #9B2C1C);
          border-radius: 16px; padding: 1.4rem 1.5rem; color: #fff; margin-bottom: 1.2rem;
        }
        .cl-header h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin: 0 0 .2rem; }
        .cl-header p { margin: 0; font-size: .82rem; opacity: .8; }
        .cl-stats { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; margin-bottom: 1.2rem; }
        .cl-stat {
          background: #fff; border-radius: 12px; padding: 1rem; text-align: center;
          border: 1.5px solid #f0e0d0;
        }
        .cl-stat-val { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; display: block; }
        .cl-stat-lbl { font-size: .75rem; color: #8a6a5a; text-transform: uppercase; letter-spacing: .05em; }
        .cl-table { width: 100%; background: #fff; border-radius: 12px; overflow: hidden; border: 1.5px solid #f0e0d0; border-collapse: collapse; font-size: .86rem; }
        .cl-table th { background: #7B1C1C; color: #fff; padding: .7rem 1rem; text-align: left; font-weight: 600; font-size: .78rem; letter-spacing: .04em; text-transform: uppercase; }
        .cl-table td { padding: .65rem 1rem; border-bottom: 1px solid #f5e8dc; color: #2a1a1a; }
        .cl-table tr:last-child td { border-bottom: none; }
        .cl-table tr:hover td { background: #fdf6ec; }
        .cl-badge { display: inline-block; padding: .18rem .6rem; border-radius: 20px; font-size: .73rem; font-weight: 600; }
        .cl-badge-pending { background: #fff3cd; color: #856404; }
        .cl-badge-paid { background: #d1e7dd; color: #0a3622; }
        .cl-back-btn {
          background: #7B1C1C; color: #fff; border: none; border-radius: 8px;
          padding: .5rem 1.2rem; font-family: 'Hind', sans-serif; font-size: .86rem;
          font-weight: 600; cursor: pointer; margin-bottom: 1rem; transition: background .2s;
        }
        .cl-back-btn:hover { background: #9b2222; }
        .cl-section-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #7B1C1C; margin-bottom: .8rem; }
      `}</style>

      <div className="cl-wrap">
        <button className="cl-back-btn" onClick={() => navigate('/admin-ledger')}>← Back to Admin Book</button>

        <div className="cl-header">
          <h2>👤 {customerName}</h2>
          <p>Customer Ledger — Saubhagya Still Bhandar</p>
        </div>

        <div className="cl-stats">
          <div className="cl-stat">
            <span className="cl-stat-val" style={{ color: '#856404' }}>₹{totalPending}</span>
            <div className="cl-stat-lbl">⏳ Pending</div>
          </div>
          <div className="cl-stat">
            <span className="cl-stat-val" style={{ color: '#198754' }}>₹{totalPaid}</span>
            <div className="cl-stat-lbl">✅ Paid</div>
          </div>
        </div>

        <div className="cl-section-title">📋 Transaction History</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="cl-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontSize: '.78rem', color: '#8a6a5a' }}>{new Date(r.date).toLocaleString()}</td>
                  <td style={{ fontWeight: 600 }}>{r.productName}</td>
                  <td>{r.quantity}</td>
                  <td style={{ fontWeight: 700, color: '#7B1C1C' }}>₹{r.amount}</td>
                  <td>
                    <span className={`cl-badge ${r.status === 'PENDING' ? 'cl-badge-pending' : 'cl-badge-paid'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}