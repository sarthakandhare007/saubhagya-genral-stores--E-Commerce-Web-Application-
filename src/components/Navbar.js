import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const token = localStorage.getItem('jwtToken');
  const roles = localStorage.getItem('roles');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  function doLogout() {
    localStorage.clear();
    window.location.href = 'http://localhost:3000';
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Nunito:wght@500;600;700&display=swap');

        .ss-navbar {
          background: linear-gradient(135deg, #1C2B3A 0%, #2D4A5E 100%);
          padding: 0 1.5rem;
          box-shadow: 0 3px 16px rgba(28,43,58,0.25);
          position: sticky;
          top: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          min-height: 64px;
        }

        .ss-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none !important;
          flex-shrink: 0;
        }
        .ss-brand-icon {
          width: 38px; height: 38px;
          background: #D4821A;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
        }
        .ss-brand-text { line-height: 1.1; }
        .ss-brand-text .b1 {
          font-family: 'Rozha One', serif;
          font-size: 1rem;
          color: #fff;
          display: block;
        }
        .ss-brand-text .b2 {
          font-family: 'Nunito', sans-serif;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: block;
        }

        .ss-search {
          flex: 1;
          max-width: 380px;
          position: relative;
        }
        .ss-search input {
          width: 100%;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.18);
          border-radius: 10px;
          padding: 0.5rem 2.8rem 0.5rem 1rem;
          color: #fff;
          font-family: 'Nunito', sans-serif;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .ss-search input::placeholder { color: rgba(255,255,255,0.4); }
        .ss-search input:focus { background: rgba(255,255,255,0.16); border-color: #D4821A; }
        .ss-search button {
          position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: rgba(255,255,255,0.6);
          cursor: pointer; font-size: 1rem; padding: 0;
          transition: color 0.2s;
        }
        .ss-search button:hover { color: #D4821A; }

        .ss-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0; padding: 0;
          flex-shrink: 0;
        }
        .ss-nav-links .nav-link-item a,
        .ss-nav-links .nav-link-item button {
          color: rgba(255,255,255,0.75) !important;
          font-family: 'Nunito', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none !important;
          padding: 0.45rem 0.75rem;
          border-radius: 8px;
          border: none;
          background: none;
          cursor: pointer;
          transition: all 0.2s;
          display: flex; align-items: center; gap: 0.3rem;
          white-space: nowrap;
        }
        .ss-nav-links .nav-link-item a:hover,
        .ss-nav-links .nav-link-item button:hover {
          background: rgba(212,130,26,0.18);
          color: #D4821A !important;
        }
        .ss-nav-links .nav-link-item a.active {
          background: rgba(212,130,26,0.22);
          color: #D4821A !important;
        }

        .ss-badge {
          background: #D4821A;
          color: #fff;
          font-size: 0.6rem;
          padding: 1px 5px;
          border-radius: 10px;
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
        }

        .ss-user-chip {
          display: flex; align-items: center; gap: 0.4rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 0.3rem 0.75rem;
          font-family: 'Nunito', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.8);
        }
        .ss-user-chip .avatar {
          width: 22px; height: 22px;
          background: #D4821A;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; color: #fff;
        }

        .ss-logout-btn {
          background: rgba(220,53,69,0.15) !important;
          border: 1px solid rgba(220,53,69,0.3) !important;
          color: #ff6b6b !important;
          border-radius: 8px !important;
        }
        .ss-logout-btn:hover {
          background: rgba(220,53,69,0.3) !important;
          color: #ff4757 !important;
        }

        .ss-hamburger {
          display: none;
          background: none; border: none;
          color: #fff; font-size: 1.4rem; cursor: pointer;
          padding: 0.3rem;
        }

        @media (max-width: 900px) {
          .ss-nav-links { display: none; }
          .ss-nav-links.open {
            display: flex; flex-direction: column;
            position: absolute; top: 64px; left: 0; right: 0;
            background: #1C2B3A;
            padding: 1rem;
            gap: 0.25rem;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            z-index: 999;
          }
          .ss-nav-links.open .nav-link-item { width: 100%; }
          .ss-nav-links.open .nav-link-item a,
          .ss-nav-links.open .nav-link-item button { width: 100%; justify-content: flex-start; }
          .ss-hamburger { display: block; }
          .ss-search { max-width: 200px; }
        }
        @media (max-width: 600px) {
          .ss-brand-text .b2 { display: none; }
          .ss-search { max-width: 140px; }
        }
      `}</style>

      <nav className="ss-navbar" style={{ position: 'relative' }}>
        {/* Brand */}
        <NavLink className="ss-brand" to="/">
          <div className="ss-brand-icon">
            <img src="shop_logo.png" alt="Saubhagya" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
          </div>
          <div className="ss-brand-text">
            <span className="b1">Saubhagya</span>
            <span className="b2">Still Bhandar • Dangsaundane</span>
          </div>
        </NavLink>

       

        {/* Nav Links */}
        <ul className={`ss-nav-links ${menuOpen ? 'open' : ''}`}>
          <li className="nav-link-item">
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          </li>

          {/* ── About Us ── */}
          <li className="nav-link-item">
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>
          </li>

          {!token && (
            <>
              <li className="nav-link-item">
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
              </li>
              <li className="nav-link-item">
                <NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
              </li>
            </>
          )}

          {roles && roles.includes('USER') && (
            <>
              <li className="nav-link-item">
                <NavLink to="/mycart" onClick={() => setMenuOpen(false)}>
                  🛒 Cart
                </NavLink>
              </li>
              <li className="nav-link-item">
                <NavLink to="/myorders" onClick={() => setMenuOpen(false)}> Orders</NavLink>
              </li>
            </>
          )}

          {roles && roles.includes('ADMIN') && (
            <>
              <li className="nav-link-item">
                <NavLink to="/add-product" onClick={() => setMenuOpen(false)}>Add Product</NavLink>
              </li>
              <li className="nav-link-item">
                <NavLink to="/admin-ledger" onClick={() => setMenuOpen(false)}>
                  📒 Udhar Book <span ></span>
                </NavLink>
              </li>
            </>
          )}

          {token && (
            <>
              {username && (
                <li className="nav-link-item">
                  <span className="ss-user-chip">
                    <span className="avatar">{username[0]?.toUpperCase()}</span>
                    {username}
                  </span>
                </li>
              )}
              <li className="nav-link-item">
                <button className="ss-logout-btn" onClick={doLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger */}
        <button className="ss-hamburger" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>
    </>
  );
}