import React, { useEffect, useRef, useState } from 'react';

const SHOP_DETAILS = {
  
  name: 'Saubhagya Still Bhandar',
  tagline: 'Mini Outlate Mall',
  established: '1956',
  address: 'Saubhagya Still Bhandar, Maharashtra, India',
  phone: '+91 943547476',
  phone2: '+91 9423227980',
  email: 'saubhagyastillbhandar@gmail.com',
  whatsapp: '9359994214',
  timing: {
    weekdays: '9:00 AM – 8:00 PM',
    saturday: '9:00 AM – 9:00 PM',
    sunday: '10:00 AM – 6:00 PM',
  },
  mapSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.5!2d74.0401444!3d20.6334479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bde660f5b6323f7%3A0x93096afbe1acf5e2!2sSaubhagya%20Still%20Bhandar!5e0!3m2!1sen!2sin!4v1710000000000',
  categories: [
    { icon: '🥄', label: 'Steel Utensils' },
    { icon: '🍳', label: 'Cookware' },
    { icon: '🫕', label: 'Kitchen Essentials' },
    { icon: '🏺', label: 'Storage Containers' },
    { icon: '🍽️', label: 'Dinner Sets' },
    { icon: '🧹', label: 'Cleaning Tools' },
  ],
  highlights: [
    { icon: '✅', title: 'Genuine Quality', desc: 'ISI marked and food-grade stainless steel products from trusted manufacturers.' },
    { icon: '💰', title: 'Best Prices', desc: 'Competitive wholesale and retail pricing with frequent offers and discounts.' },
    { icon: '🚚', title: 'Local Delivery', desc: 'Prompt delivery within the local area. Free delivery on orders above ₹500.' },
    { icon: '🤝', title: 'Trusted for Years', desc: 'Serving thousands of happy households and businesses since our establishment.' },
    { icon: '🛠️', title: 'Wide Range', desc: 'From everyday kitchen items to bulk industrial utensils — we have it all.' },
    { icon: '⭐', title: 'Top Rated', desc: 'Consistently rated 4.5+ on Google by our loyal local customers.' },
  ],
  testimonials: [
    { name: 'Sunita Patil', text: 'Best steel shop in the area! Great quality and very reasonable prices. My go-to for all kitchen needs.', stars: 5 },
    { name: 'Ramesh Deshmukh', text: 'I have been buying from Saubhagya for over 5 years. Always genuine products and helpful staff.', stars: 5 },
    { name: 'Priya Joshi', text: 'Got a full dinner set for my daughter\'s wedding. Beautiful quality and delivered on time!', stars: 5 },
  ],
};

export default function AboutUs() {
  const [activeDay, setActiveDay] = useState(new Date().getDay());
  const mapRef = useRef(null);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const getTimeForDay = (day) => {
    if (day === 0) return SHOP_DETAILS.timing.sunday;
    if (day === 6) return SHOP_DETAILS.timing.saturday;
    return SHOP_DETAILS.timing.weekdays;
  };
  const today = new Date().getDay();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Hind:wght@300;400;500;600&display=swap');
        body { background: #fdf6ec !important; font-family: 'Hind', sans-serif; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        @keyframes shimmer { 0%{background-position:200% 0}100%{background-position:-200% 0} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }

        /* ── Hero ── */
        .au-hero {
          background: linear-gradient(140deg, #5a1010 0%, #7B1C1C 40%, #9B2C1C 70%, #C9992A 100%);
          padding: 3.5rem 1.5rem 4rem;
          text-align: center;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .au-hero::before {
          content:''; position:absolute; inset:0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .au-hero-badge {
          display: inline-block; background: rgba(255,255,255,.18);
          border: 1px solid rgba(255,255,255,.3); padding: .22rem .9rem;
          border-radius: 30px; font-size: .72rem; letter-spacing: .1em;
          text-transform: uppercase; margin-bottom: .9rem;
          animation: fadeUp .4s ease both;
        }
        .au-hero-logo { font-size: 3.5rem; display: block; margin-bottom: .6rem; animation: fadeUp .4s .1s ease both; }
        .au-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 5vw, 3rem);
          margin: 0 0 .4rem; line-height: 1.15;
          animation: fadeUp .4s .15s ease both;
        }
        .au-hero-sub {
          font-size: .95rem; opacity: .85; font-weight: 300;
          max-width: 480px; margin: 0 auto .9rem;
          animation: fadeUp .4s .2s ease both;
        }
        .au-hero-chips { display: flex; gap: .5rem; justify-content: center; flex-wrap: wrap; animation: fadeUp .4s .25s ease both; }
        .au-chip {
          background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.25);
          padding: .28rem .8rem; border-radius: 20px; font-size: .78rem;
        }
        .au-hero-wave {
          position: absolute; bottom: -1px; left: 0; right: 0;
          height: 50px; background: #fdf6ec;
          clip-path: ellipse(55% 100% at 50% 100%);
        }

        /* ── Layout ── */
        .au-wrap { max-width: 1050px; margin: 0 auto; padding: 2rem 1rem 4rem; }
        .au-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; color: #7B1C1C; margin-bottom: 1.2rem;
          display: flex; align-items: center; gap: .6rem;
        }
        .au-section-title::after {
          content:''; flex:1; height:2px;
          background: linear-gradient(to right,#C9992A,transparent); border-radius:1px;
        }
        .au-divider { height: 3px; background: linear-gradient(to right,#7B1C1C,#C9992A,#7B1C1C); margin: 2.5rem 0; border-radius:2px; }

        /* ── Story ── */
        .au-story {
          background: #fff; border-radius: 18px; border: 1.5px solid #f0e0d0;
          padding: 2rem; margin-bottom: 2rem;
          box-shadow: 0 4px 16px rgba(123,28,28,.07);
          animation: fadeUp .5s ease both;
        }
        .au-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: center; }
        .au-story p { font-size: .92rem; color: #4a2a2a; line-height: 1.8; margin-bottom: .9rem; }
        .au-story p:last-child { margin-bottom: 0; }
        .au-est-badge {
          background: linear-gradient(135deg,#7B1C1C,#C9992A);
          color: #fff; border-radius: 16px; padding: 1.8rem;
          text-align: center;
        }
        .au-est-year { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 700; line-height: 1; display: block; }
        .au-est-lbl { font-size: .78rem; letter-spacing: .1em; text-transform: uppercase; opacity: .9; margin-top: .3rem; display: block; }
        .au-est-desc { font-size: .82rem; opacity: .85; margin-top: .8rem; line-height: 1.5; }

        /* ── Highlights ── */
        .au-highlights-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; margin-bottom: 2rem;
        }
        .au-highlight {
          background: #fff; border-radius: 14px; border: 1.5px solid #f0e0d0;
          padding: 1.3rem 1.1rem; transition: transform .22s, box-shadow .22s;
          animation: fadeUp .4s ease both;
        }
        .au-highlight:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(123,28,28,.12); border-color: #e8c8a0; }
        .au-hl-icon { font-size: 1.9rem; display: block; margin-bottom: .55rem; }
        .au-hl-title { font-weight: 700; font-size: .92rem; color: #2a1a1a; margin-bottom: .3rem; }
        .au-hl-desc { font-size: .78rem; color: #8a6a5a; line-height: 1.55; }

        /* ── Categories ── */
        .au-cats-grid {
          display: grid; grid-template-columns: repeat(auto-fill,minmax(130px,1fr)); gap: .9rem; margin-bottom: 2rem;
        }
        .au-cat {
          background: #fff; border-radius: 12px; border: 1.5px solid #f0e0d0;
          padding: 1.1rem .8rem; text-align: center;
          transition: transform .2s, border-color .2s; cursor: default;
        }
        .au-cat:hover { transform: translateY(-3px); border-color: #C9992A; }
        .au-cat-icon { font-size: 1.8rem; display: block; margin-bottom: .4rem; }
        .au-cat-lbl { font-size: .8rem; font-weight: 600; color: #5a3a3a; }

        /* ── Contact + Map ── */
        .au-contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 1.5rem; margin-bottom: 2rem; }
        .au-contact-card {
          background: #fff; border-radius: 16px; border: 1.5px solid #f0e0d0;
          padding: 1.5rem; box-shadow: 0 4px 14px rgba(123,28,28,.07);
        }
        .au-contact-card h3 { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: #7B1C1C; margin: 0 0 1.1rem; }
        .au-contact-row {
          display: flex; gap: .75rem; align-items: flex-start;
          padding: .7rem 0; border-bottom: 1px solid #f5e8dc;
        }
        .au-contact-row:last-child { border-bottom: none; }
        .au-contact-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: #fdf0f0; display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0; margin-top: .1rem;
        }
        .au-contact-lbl { font-size: .73rem; font-weight: 600; color: #8a6a5a; text-transform: uppercase; letter-spacing: .06em; }
        .au-contact-val { font-size: .88rem; color: #2a1a1a; font-weight: 500; margin-top: .1rem; line-height: 1.5; }
        .au-contact-val a { color: #7B1C1C; text-decoration: none; font-weight: 600; }
        .au-contact-val a:hover { text-decoration: underline; }

        /* Hours */
        .au-hours { margin-top: 1.2rem; }
        .au-hours h4 { font-family: 'Playfair Display', serif; font-size: .95rem; color: #7B1C1C; margin: 0 0 .7rem; }
        .au-hour-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: .38rem .6rem; border-radius: 8px; font-size: .82rem; margin-bottom: .25rem;
          transition: background .15s;
        }
        .au-hour-row.today { background: #7B1C1C; color: #fff; font-weight: 600; }
        .au-hour-row:not(.today) { color: #5a3a3a; }
        .au-hour-row:not(.today):hover { background: #fdf0f0; }
        .au-open-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #25D366;
          display: inline-block; margin-right: .35rem;
          animation: pulse 2s infinite;
        }

        /* Map */
        .au-map-card {
          background: #fff; border-radius: 16px; border: 1.5px solid #f0e0d0;
          overflow: hidden; box-shadow: 0 4px 14px rgba(123,28,28,.07);
        }
        .au-map-card iframe { width: 100%; height: 320px; border: none; display: block; }
        .au-map-footer {
          padding: .9rem 1.1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
        }
        .au-map-addr { font-size: .82rem; color: #5a3a3a; }
        .au-map-addr strong { color: #2a1a1a; font-weight: 600; }
        .au-dir-btn {
          background: #7B1C1C; color: #fff; border: none; border-radius: 9px;
          padding: .45rem 1rem; font-family: 'Hind', sans-serif; font-size: .82rem;
          font-weight: 600; cursor: pointer; transition: background .2s; white-space: nowrap;
          text-decoration: none; display: inline-block;
        }
        .au-dir-btn:hover { background: #9b2222; }

        /* WhatsApp CTA */
        .au-wa-cta {
          background: linear-gradient(135deg,#075E54,#128C7E);
          border-radius: 14px; padding: 1.5rem; color: #fff;
          display: flex; align-items: center; gap: 1.2rem;
          margin-bottom: 2rem; flex-wrap: wrap;
          box-shadow: 0 4px 16px rgba(7,94,84,.2);
        }
        .au-wa-icon { font-size: 2.8rem; flex-shrink: 0; }
        .au-wa-text { flex: 1; }
        .au-wa-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; margin-bottom: .2rem; }
        .au-wa-sub { font-size: .82rem; opacity: .9; }
        .au-wa-btn {
          background: #25D366; color: #fff; border: none; border-radius: 10px;
          padding: .6rem 1.4rem; font-family: 'Hind', sans-serif; font-size: .9rem;
          font-weight: 700; cursor: pointer; transition: all .2s; white-space: nowrap;
          text-decoration: none; display: inline-block;
        }
        .au-wa-btn:hover { background: #1ebe5d; transform: translateY(-1px); }

        /* Testimonials */
        .au-testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; margin-bottom: 2rem; }
        .au-testi {
          background: #fff; border-radius: 14px; border: 1.5px solid #f0e0d0;
          padding: 1.3rem; animation: fadeUp .4s ease both;
        }
        .au-testi-stars { color: #C9992A; font-size: 1.1rem; margin-bottom: .5rem; }
        .au-testi-text { font-size: .85rem; color: #4a2a2a; line-height: 1.6; font-style: italic; margin-bottom: .7rem; }
        .au-testi-name { font-weight: 700; font-size: .82rem; color: #7B1C1C; }

        /* Responsive */
        @media(max-width: 768px) {
          .au-story-grid { grid-template-columns: 1fr; }
          .au-highlights-grid { grid-template-columns: repeat(2,1fr); }
          .au-contact-grid { grid-template-columns: 1fr; }
          .au-testi-grid { grid-template-columns: 1fr; }
          .au-map-card iframe { height: 250px; }
        }
        @media(max-width: 480px) {
          .au-highlights-grid { grid-template-columns: 1fr 1fr; }
          .au-cats-grid { grid-template-columns: repeat(3,1fr); }
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="au-hero">
        <span className="au-hero-badge">🏺 Est. {SHOP_DETAILS.established} · Maharashtra, India</span>
        <span className="au-hero-logo">🏪</span>
        <h1 className="au-hero-title">{SHOP_DETAILS.name}</h1>
        <p className="au-hero-sub">{SHOP_DETAILS.tagline}</p>
        <div className="au-hero-chips">
          <span className="au-chip">🥄 Steel Utensils</span>
          <span className="au-chip">🍳 Cookware</span>
          <span className="au-chip">🏺 Kitchenware</span>
          <span className="au-chip">🛒 Retail & Wholesale</span>
        </div>
        <div className="au-hero-wave" />
      </div>

      <div className="au-wrap">

        {/* ── Our Story ── */}
        <div className="au-section-title">📖 Our Story</div>
        <div className="au-story">
          <div className="au-story-grid">
            <div>
              <p>
                <strong>Saubhagya Still Bhandar</strong> was founded with a simple mission — to provide
                every household with high-quality, durable steel utensils and kitchenware at honest prices.
                Rooted in the heart of Maharashtra, we have been a trusted name for families, caterers,
                and businesses alike.
              </p>
              <p>
                Our curated collection spans everything from everyday cooking vessels and pressure cookers
                to premium dinner sets, storage containers, and industrial-grade utensils. Every product
                we stock is hand-picked for quality, durability, and value for money.
              </p>
              <p>
                What started as a small neighbourhood shop has grown into a well-known destination for
                steel and kitchenware in the region — built on word-of-mouth, genuine products, and
                the trust of thousands of satisfied customers over the years.
              </p>
            </div>
            <div className="au-est-badge">
              {/* <span className="au-est-year">{SHOP_DETAILS.established}</span> */}
              <img src="sau.jpg" alt="Shop" style={{ width: '100%', height: 'auto', marginBottom: '0.5rem' }} />
              <span className="au-est-lbl">ANDHARE BROTHERS</span>
              <p className="au-est-desc">
                
              </p>
            </div>
          </div>
        </div>

        <div className="au-divider" />

        {/* ── Why Choose Us ── */}
        <div className="au-section-title">⭐ Why Choose Us</div>
        <div className="au-highlights-grid">
          {SHOP_DETAILS.highlights.map((h, i) => (
            <div className="au-highlight" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
              <span className="au-hl-icon">{h.icon}</span>
              <div className="au-hl-title">{h.title}</div>
              <div className="au-hl-desc">{h.desc}</div>
            </div>
          ))}
        </div>

        {/* ── Product Categories ── */}
        <div className="au-section-title">📦 What We Sell</div>
        <div className="au-cats-grid">
          {SHOP_DETAILS.categories.map((c, i) => (
            <div className="au-cat" key={i}>
              <span className="au-cat-icon">{c.icon}</span>
              <div className="au-cat-lbl">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="au-divider" />

        {/* ── WhatsApp CTA ── */}
        <div className="au-wa-cta">
          <div className="au-wa-icon"> </div>
          <div className="au-wa-text">
            <div className="au-wa-title">Chat with us on WhatsApp</div>
            <div className="au-wa-sub">Get instant quotes, check availability, or place bulk orders — we respond fast!</div>
          </div>
          <a
            className="au-wa-btn"
        href="https://wa.me/919359994214?text=Hello%20Saubhagya%20Still%20Bhandar%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
            target="_blank"
            rel="noreferrer"
          >
            <img src="wp.png" alt="WhatsApp" />
          </a>
        </div>

        {/* ── Contact + Map ── */}
        <div className="au-section-title">📍 Find Us</div>
        <div className="au-contact-grid">

          {/* Contact Details */}
          <div>
            <div className="au-contact-card">
              <h3>📞 Contact Information</h3>

              <div className="au-contact-row">
                <div className="au-contact-icon">📍</div>
                <div>
                  <div className="au-contact-lbl">Address</div>
                  <div className="au-contact-val">{SHOP_DETAILS.address}</div>
                </div>
              </div>

              <div className="au-contact-row">
                <div className="au-contact-icon">📱</div>
                <div>
                  <div className="au-contact-lbl">Phone / Mobile</div>
                  <div className="au-contact-val">
                    <a href={`tel:${SHOP_DETAILS.phone.replace(/\s/g, '')}`}>{SHOP_DETAILS.phone}</a>
                    <br />
                    <a href={`tel:${SHOP_DETAILS.phone2.replace(/\s/g, '')}`}>{SHOP_DETAILS.phone2}</a>
                  </div>
                </div>
              </div>

              <div className="au-contact-row">
                <div className="au-contact-icon">✉️</div>
                <div>
                  <div className="au-contact-lbl">Email</div>
                  <div className="au-contact-val">
                    <a href={`mailto:${SHOP_DETAILS.email}`}>{SHOP_DETAILS.email}</a>
                  </div>
                </div>
              </div>

              <div className="au-contact-row">
                <div className="au-contact-icon">💬</div>
                <div>
                  <div className="au-contact-lbl">WhatsApp</div>
                  <div className="au-contact-val">
                    <a
                      href={`https://wa.me/${SHOP_DETAILS.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Message us on WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="au-contact-card" style={{ marginTop: '1rem' }}>
              <h3>🕐 Business Hours</h3>
              <div className="au-hours">
                {days.map((day, i) => (
                  <div key={day} className={`au-hour-row ${i === today ? 'today' : ''}`}>
                    <span>
                      {i === today && <span className="au-open-dot" />}
                      {day} {i === today && '(Today)'}
                    </span>
                    <span>{getTimeForDay(i)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="au-map-card">
            <iframe
              title="Saubhagya Still Bhandar Location"
              src={SHOP_DETAILS.mapSrc}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="au-map-footer">
              <div className="au-map-addr">
                <strong>Saubhagya Still Bhandar</strong><br />
                Maharashtra, India
              </div>
              <a
                className="au-dir-btn"
                href="https://maps.app.goo.gl/hKwBcaxq55ZBRAHP6"
                target="_blank"
                rel="noreferrer"
              >
                🗺️ Get Directions
              </a>
            </div>
          </div>
        </div>

        <div className="au-divider" />

        {/* ── Testimonials ── */}
        <div className="au-section-title">💬 What Customers Say</div>
        <div className="au-testi-grid">
          {SHOP_DETAILS.testimonials.map((t, i) => (
            <div className="au-testi" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="au-testi-stars">{'★'.repeat(t.stars)}</div>
              <div className="au-testi-text">"{t.text}"</div>
              <div className="au-testi-name">— {t.name}</div>
            </div>
          ))}
        </div>

        {/* ── Final CTA ── */}
        <div style={{
          background: 'linear-gradient(135deg,#7B1C1C,#9B2C1C)',
          borderRadius: 18, padding: '2rem 1.5rem', color: '#fff', textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '.5rem' }}>🛒</div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', margin: '0 0 .5rem' }}>
            Ready to shop?
          </h3>
          <p style={{ fontSize: '.88rem', opacity: .85, margin: '0 0 1.2rem' }}>
            Browse our full collection of quality steel utensils and kitchenware
          </p>
          <a
            href="/"
            style={{
              background: '#C9992A', color: '#fff', border: 'none', borderRadius: 10,
              padding: '.7rem 2rem', fontFamily: 'Hind, sans-serif', fontSize: '.95rem',
              fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
              transition: 'background .2s'
            }}
          >
            🏠 Browse Products
          </a>
        </div>

      </div>
    </>
  );
}