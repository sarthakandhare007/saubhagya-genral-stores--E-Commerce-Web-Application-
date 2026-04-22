import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Nunito:wght@400;500;600;700&display=swap');

        .ss-footer {
          background: linear-gradient(160deg, #111D27 0%, #1C2B3A 60%, #22354A 100%);
          color: rgba(255,255,255,0.75);
          font-family: 'Nunito', sans-serif;
          margin-top: 4rem;
        }

        /* ── Top strip ── */
        .ss-footer-top {
          background: #D4821A;
          padding: 0.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .ss-footer-top span {
          font-family: 'Nunito', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .ss-footer-top a {
          background: rgba(255,255,255,0.2);
          color: #fff;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.3rem 0.9rem;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.35);
          transition: background 0.2s;
          white-space: nowrap;
        }
        .ss-footer-top a:hover { background: rgba(255,255,255,0.35); }

        /* ── Main grid ── */
        .ss-footer-main {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
          gap: 2.5rem;
          padding: 3rem 2rem 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Brand col */
        .ss-footer-brand-icon {
          width: 48px; height: 48px;
          background: #D4821A;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
          margin-bottom: 0.8rem;
        }
        .ss-footer-name {
          font-family: 'Rozha One', serif;
          font-size: 1.3rem;
          color: #fff;
          line-height: 1.1;
        }
        .ss-footer-tagline {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-top: 0.2rem;
          margin-bottom: 1rem;
        }
        .ss-footer-desc {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          margin-bottom: 1.2rem;
        }
        .ss-footer-social {
          display: flex;
          gap: 0.5rem;
        }
        .ss-social-btn {
          width: 36px; height: 36px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }
        .ss-social-btn:hover {
          background: #D4821A;
          border-color: #D4821A;
          color: #fff;
          transform: translateY(-2px);
        }

        /* Link cols */
        .ss-footer-col h4 {
          font-family: 'Rozha One', serif;
          font-size: 0.95rem;
          color: #fff;
          margin: 0 0 1rem;
          letter-spacing: 0.02em;
          position: relative;
          padding-bottom: 0.6rem;
        }
        .ss-footer-col h4::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 28px; height: 2px;
          background: #D4821A;
          border-radius: 1px;
        }
        .ss-footer-col ul {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .ss-footer-col ul li a,
        .ss-footer-col ul li span {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .ss-footer-col ul li a:hover { color: #D4821A; }

        /* Contact col */
        .ss-contact-item {
          display: flex;
          gap: 0.7rem;
          align-items: flex-start;
          margin-bottom: 0.9rem;
        }
        .ss-contact-item:last-child { margin-bottom: 0; }
        .ss-contact-icon {
          width: 32px; height: 32px;
          background: rgba(212,130,26,0.15);
          border: 1px solid rgba(212,130,26,0.3);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .ss-contact-lbl {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: block;
          margin-bottom: 0.1rem;
        }
        .ss-contact-val {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.5;
        }
        .ss-contact-val a {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ss-contact-val a:hover { color: #D4821A; }

        /* ── Divider ── */
        .ss-footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Bottom bar ── */
        .ss-footer-bottom {
          max-width: 1100px;
          margin: 0 auto;
          padding: 1.1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.7rem;
        }
        .ss-footer-copy {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.35);
        }
        .ss-footer-copy strong { color: rgba(255,255,255,0.55); }
        .ss-footer-bottom-links {
          display: flex;
          gap: 1.2rem;
        }
        .ss-footer-bottom-links a {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ss-footer-bottom-links a:hover { color: #D4821A; }

        /* ── Hours badge ── */
        .ss-open-now {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(37,211,102,0.12);
          border: 1px solid rgba(37,211,102,0.25);
          color: #25D366;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.18rem 0.6rem;
          border-radius: 20px;
          margin-bottom: 0.7rem;
        }
        .ss-open-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #25D366;
          animation: fpulse 2s infinite;
        }
        @keyframes fpulse { 0%,100%{opacity:1} 50%{opacity:.4} }

        /* WhatsApp float */
        .ss-wa-float {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 52px; height: 52px;
          background: #25D366;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
          box-shadow: 0 4px 16px rgba(37,211,102,0.4);
          text-decoration: none;
          z-index: 999;
          transition: transform 0.2s, box-shadow 0.2s;
          animation: bounce 3s ease-in-out infinite;
        }
        .ss-wa-float:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 22px rgba(37,211,102,0.55);
        }
        @keyframes bounce {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-5px)}
        }
        .ss-wa-tooltip {
          position: absolute;
          right: 60px;
          background: #075E54;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.7rem;
          border-radius: 8px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }
        .ss-wa-float:hover .ss-wa-tooltip { opacity: 1; }

        @media (max-width: 900px) {
          .ss-footer-main { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 560px) {
          .ss-footer-main { grid-template-columns: 1fr; gap: 1.8rem; padding: 2rem 1.2rem 1.5rem; }
          .ss-footer-top { padding: 0.65rem 1.2rem; }
          .ss-footer-bottom { padding: 1rem 1.2rem; flex-direction: column; align-items: flex-start; gap: 0.4rem; }
        }
      `}</style>

      {/* ── WhatsApp Floating Button ── */}
      <a
        className="ss-wa-float"
        href="https://wa.me/919359994214?text=Hello%20Saubhagya%20Still%20Bhandar%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
      >
        <img src="wp.png" alt="WhatsApp" />
        <span className="ss-wa-tooltip">Chat with us!</span>
      </a>

      <footer className="ss-footer">

        {/* ── Top promo strip ── */}
        <div className="ss-footer-top">
         
         
        </div>

        {/* ── Main content ── */}
        <div className="ss-footer-main">

          {/* Brand */}
          <div>
            {/* <div className="ss-footer-brand-icon">🥘</div> */}
            <div className="ss-footer-name">Saubhagya Still Bhandar</div>
            <div className="ss-footer-tagline">Dangsaundane · Maharashtra</div>
            {/* <p className="ss-footer-desc">
              Your trusted neighbourhood store for premium quality steel utensils,
              cookware, and kitchenware. Serving Maharashtra families since 2014
              with genuine products at honest prices.
            </p> */}
            <div className="ss-open-now">
              <span className="ss-open-dot" />
              Open Today · 9:00 AM – 8:00 PM
            </div>
            <div className="ss-footer-social">
              <a
                className="ss-social-btn"
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                title="WhatsApp"
              >💬</a>
              <a
                className="ss-social-btn"
                href="https://maps.app.goo.gl/hKwBcaxq55ZBRAHP6"
                target="_blank"
                rel="noreferrer"
                title="Google Maps"
              >🗺️</a>
              <a
                className="ss-social-btn"
                href="mailto:saubhagyastillbhandar@gmail.com"
                title="Email"
              >✉️</a>
              <a
                className="ss-social-btn"
                href="tel:+919876543210"
                title="Call Us"
              >📞</a>
            </div>
          </div>

         

          {/* Categories */}
          <div className="ss-footer-col">
           
          </div>

          {/* Contact */}
          <div className="ss-footer-col">
            <h4>Contact Us</h4>

            <div className="ss-contact-item">
              <div className="ss-contact-icon">📍</div>
              <div>
                <span className="ss-contact-lbl">Address</span>
                <div className="ss-contact-val">
                  Saubhagya Still Bhandar,<br />
                  Dangsaundane, Maharashtra,<br />
                  India
                </div>
              </div>
            </div>

           

            <div className="ss-contact-item">
              <div className="ss-contact-icon">✉️</div>
              <div>
                <span className="ss-contact-lbl">Email</span>
                <div className="ss-contact-val">
                  <a href="mailto:saubhagyastillbhandar@gmail.com">
                    saubhagyastillbhandar@gmail.com
                  </a>
                </div>
              </div>
            </div>

            
          </div>

        </div>

        <div className="ss-footer-divider" />

        {/* ── Bottom bar ── */}
        <div className="ss-footer-bottom">
          <div className="ss-footer-copy">
            © {currentYear} <strong>Saubhagya Still Bhandar</strong>. All rights reserved.
          </div>
          <div className="ss-footer-bottom-links">
            <NavLink to="/about">About</NavLink>
            <a href="mailto:saubhagyastillbhandar@gmail.com">Contact</a>
            <a href="https://maps.app.goo.gl/hKwBcaxq55ZBRAHP6" target="_blank" rel="noreferrer">Find Store</a>
          </div>
        </div>

      </footer>
    </>
  );
}