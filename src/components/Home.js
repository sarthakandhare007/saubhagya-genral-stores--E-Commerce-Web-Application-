import React, { useEffect, useState } from 'react';
import Product from './Product';

// Category icons mapping for a steel utensils shop
const CATEGORY_ICONS = {
  default: '🛒',
  furniture: '🪑',
  electronics: '📱',
  clothing: '👕',
  kitchen: '🍳',
  cookware: '🥘',
  plates: '🍽️',
  glasses: '🥛',
  bowls: '🥣',
  steel: '⚙️',
  utensils: '🥄',
  storage: '📦',
  decor: '🪔',
  appliances: '🔌',
  toys: '🪀',
  books: '📚',
  sports: '⚽',
  tools: '🔧',
  marriage:'💑',
  beauty:'💄',
  pooja:'🪔'
};

function getCategoryIcon(cat) {
  if (!cat) return '🛒';
  const lower = cat.toLowerCase();
  for (const key of Object.keys(CATEGORY_ICONS)) {
    if (lower.includes(key)) return CATEGORY_ICONS[key];
  }
  return '🛒';
}

export default function Home() {
  const [allProducts, setAllProducts] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [direction, setDirection] = useState('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inject styles
    const style = document.createElement('style');
    style.id = 'home-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Nunito:wght@400;500;600;700&display=swap');

      :root {
        --primary: #D4821A;
        --primary-dark: #B86A10;
        --primary-light: #F5E6D0;
        --steel: #6B8FA3;
        --steel-light: #E8F1F5;
        --dark: #1C2B3A;
        --text: #2D3748;
        --muted: #718096;
        --bg: #FDF8F3;
        --white: #FFFFFF;
        --border: #E8E0D8;
        --success: #2F855A;
        --shadow-sm: 0 2px 8px rgba(28,43,58,0.08);
        --shadow-md: 0 4px 20px rgba(28,43,58,0.12);
        --shadow-lg: 0 8px 32px rgba(28,43,58,0.16);
        --radius: 14px;
        --radius-sm: 8px;
      }

      body {
        background: var(--bg) !important;
        font-family: 'Nunito', sans-serif !important;
        color: var(--text);
      }

      /* ===== HERO BANNER ===== */
      .shop-hero {
        background: linear-gradient(135deg, #1C2B3A 0%, #2D4A5E 50%, #1C2B3A 100%);
        border-radius: var(--radius);
        padding: 2.5rem 2rem;
        margin-bottom: 2rem;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
      }
      .shop-hero::before {
        content: '';
        position: absolute;
        top: -40px; right: -40px;
        width: 200px; height: 200px;
        border-radius: 50%;
        background: rgba(212,130,26,0.15);
      }
      .shop-hero::after {
        content: '';
        position: absolute;
        bottom: -60px; left: 30%;
        width: 280px; height: 280px;
        border-radius: 50%;
        background: rgba(107,143,163,0.08);
      }

      /* ===== LOGO ===== */
      .hero-logo {
        z-index: 1;
        flex-shrink: 0;
      }
      .logo-img {
        width: 110px;
        height: 110px;
        object-fit: contain;
        border-radius: 50%;
        background: #fff;
        padding: 6px;
        box-shadow: 0 4px 18px rgba(0,0,0,0.30);
        border: 3px solid var(--primary);
        display: block;
      }

      .hero-text {
        flex: 1;
        z-index: 1;
      }
      .hero-text h1 {
        font-family: 'Rozha One', serif;
        font-size: clamp(1.5rem, 3vw, 2.2rem);
        color: #FFF;
        margin-bottom: 0.4rem;
        line-height: 1.2;
      }
      .hero-text h1 span { color: var(--primary); }
      .hero-text p { color: rgba(255,255,255,0.65); font-size: 0.95rem; margin: 0; }
      .hero-badge {
        background: var(--primary);
        color: #fff;
        font-family: 'Rozha One', serif;
        font-size: 1.1rem;
        padding: 0.8rem 1.4rem;
        border-radius: var(--radius-sm);
        text-align: center;
        white-space: nowrap;
        z-index: 1;
      }
      .hero-badge span { display: block; font-size: 0.7rem; font-family: 'Nunito', sans-serif; opacity: 0.85; }

      /* ===== SEARCH BAR ===== */
      .search-section {
        background: var(--white);
        border-radius: var(--radius);
        padding: 1.25rem 1.5rem;
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--border);
        margin-bottom: 2rem;
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        align-items: center;
      }
      .search-input {
        border: 1.5px solid var(--border) !important;
        border-radius: var(--radius-sm) !important;
        padding: 0.6rem 1rem !important;
        font-family: 'Nunito', sans-serif !important;
        font-size: 0.9rem !important;
        transition: border-color 0.2s !important;
        background: var(--bg) !important;
      }
      .search-input:focus {
        outline: none !important;
        border-color: var(--primary) !important;
        box-shadow: 0 0 0 3px rgba(212,130,26,0.12) !important;
      }
      .search-btn {
        background: var(--primary) !important;
        border: none !important;
        color: #fff !important;
        padding: 0.6rem 1.5rem !important;
        border-radius: var(--radius-sm) !important;
        font-family: 'Nunito', sans-serif !important;
        font-weight: 700 !important;
        font-size: 0.9rem !important;
        cursor: pointer;
        transition: background 0.2s, transform 0.1s !important;
        white-space: nowrap;
      }
      .search-btn:hover { background: var(--primary-dark) !important; transform: translateY(-1px); }
      .sort-btn {
        background: var(--steel-light) !important;
        border: 1.5px solid var(--steel) !important;
        color: var(--steel) !important;
        padding: 0.6rem 1rem !important;
        border-radius: var(--radius-sm) !important;
        font-family: 'Nunito', sans-serif !important;
        font-size: 0.85rem !important;
        font-weight: 600 !important;
        cursor: pointer;
        transition: all 0.2s !important;
        white-space: nowrap;
      }
      .sort-btn:hover { background: var(--steel) !important; color: #fff !important; }
      .select-cat {
        border: 1.5px solid var(--border) !important;
        border-radius: var(--radius-sm) !important;
        padding: 0.6rem 1rem !important;
        font-family: 'Nunito', sans-serif !important;
        font-size: 0.9rem !important;
        background: var(--bg) !important;
        cursor: pointer;
      }

      /* ===== CATEGORY CARDS ===== */
      .section-title {
        font-family: 'Rozha One', serif;
        font-size: 1.4rem;
        color: var(--dark);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .section-title::after {
        content: '';
        flex: 1;
        height: 2px;
        background: linear-gradient(to right, var(--primary), transparent);
        border-radius: 2px;
      }
      .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 0.85rem;
        margin-bottom: 2rem;
      }
      .cat-card {
        background: var(--white);
        border: 2px solid var(--border);
        border-radius: var(--radius);
        padding: 1.1rem 0.75rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.22s ease;
        box-shadow: var(--shadow-sm);
        user-select: none;
      }
      .cat-card:hover {
        border-color: var(--primary);
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
      }
      .cat-card.active {
        background: var(--primary-light);
        border-color: var(--primary);
        box-shadow: 0 4px 16px rgba(212,130,26,0.22);
        transform: translateY(-3px);
      }
      .cat-card.all-cat {
        background: linear-gradient(135deg, var(--primary-light), var(--steel-light));
        border-color: var(--primary);
      }
      .cat-icon { font-size: 1.8rem; display: block; margin-bottom: 0.45rem; line-height: 1; }
      .cat-name {
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--text);
        text-transform: uppercase;
        letter-spacing: 0.03em;
        line-height: 1.2;
      }
      .cat-card.active .cat-name { color: var(--primary-dark); }

      /* ===== PRODUCTS SECTION ===== */
      .products-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      .product-count {
        background: var(--primary-light);
        color: var(--primary-dark);
        font-size: 0.8rem;
        font-weight: 700;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        border: 1px solid rgba(212,130,26,0.3);
      }
      .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1.25rem;
      }
      .no-products {
        grid-column: 1/-1;
        text-align: center;
        padding: 3rem;
        color: var(--muted);
      }
      .no-products .no-icon { font-size: 3rem; margin-bottom: 0.75rem; display: block; }

      /* ===== LOADING SKELETON ===== */
      .skeleton {
        background: linear-gradient(90deg, #f0e8df 25%, #e8ddd4 50%, #f0e8df 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: var(--radius);
        height: 320px;
      }
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* ===== HOME INTRO SECTION ===== */
      .home-intro {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2.5rem;
        align-items: center;
        margin: 3rem 0;
        padding: 2rem;
        background: linear-gradient(135deg, var(--primary-light) 0%, var(--steel-light) 100%);
        border-radius: var(--radius);
      }
      .intro-content h2 {
        font-family: 'Rozha One', serif;
        font-size: 2.2rem;
        color: var(--dark);
        margin-bottom: 1rem;
        line-height: 1.3;
      }
      .intro-content p {
        color: var(--text);
        font-size: 1rem;
        line-height: 1.8;
        margin-bottom: 1rem;
      }
      .features-list {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        margin-top: 1.5rem;
      }
      .feature-item {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }
      .feature-icon {
        font-size: 1.5rem;
        min-width: 2rem;
      }
      .feature-text {
        color: var(--text);
        font-size: 0.95rem;
      }
      .intro-highlight {
        font-weight: 700;
        color: var(--primary-dark);
      }
      .intro-image {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8rem;
        opacity: 0.9;
        filter: drop-shadow(0 4px 12px rgba(212,130,26,0.2));
      }

      /* ===== RESPONSIVE ===== */
      @media (max-width: 768px) {
        .shop-hero { flex-direction: column; gap: 1rem; text-align: center; }
        .search-section { flex-direction: column; }
        .search-input, .search-btn, .sort-btn, .select-cat { width: 100% !important; }
        .categories-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); }
        .products-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
        .home-intro { grid-template-columns: 1fr; gap: 1.5rem; padding: 1.5rem; }
        .intro-image { font-size: 4rem; }
        .logo-img { width: 80px; height: 80px; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById('home-styles');
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://localhost:8080/api/categories').then(r => r.json()),
      fetch('http://localhost:8080/api/products').then(r => r.json()),
    ]).then(([cats, prods]) => {
      setAllCategories(cats);
      setAllProducts(prods._embedded?.products || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  function handleCategoryClick(cat) {
    const newCat = cat === selectedCategory ? null : cat;
    setSelectedCategory(newCat);
    fetchProducts(newCat, name, maxPrice, direction);
  }

  function fetchProducts(cat, nm, price, dir) {
    const params = new URLSearchParams();
    if (cat) params.append('category', cat);
    if (nm) params.append('name', nm);
    if (price) params.append('maxPrice', price);
    if (dir) params.append('direction', dir);

    setLoading(true);
    fetch(`http://localhost:8080/api/search-products?${params.toString()}`)
      .then(r => r.json())
      .then(data => { setAllProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }

  function searchProducts() {
    fetchProducts(selectedCategory, name, maxPrice, direction);
  }

  function toggleSort() {
    const newDir = direction === 'asc' ? 'desc' : 'asc';
    setDirection(newDir);
    fetchProducts(selectedCategory, name, maxPrice, newDir);
  }

  return (
    <div style={{ padding: '1.25rem 0.5rem' }}>

      {/* Hero Banner */}
      <div className="shop-hero">

        <div className="hero-logo">
          <img
            src="/shop_logo.png"
            alt="Saubhagya General Stores Logo"
            className="logo-img"
          />
        </div>

        {/* Shop Name & Tagline */}
        <div className="hero-text">
          <h1> <span>Saubhagya</span> Steel Bhandar</h1>
          <p>Mini Outlet Mall • By-Andhare Brothers • Dangsaundane</p>
        </div>

        {/* Badge */}
        {/* <div className="hero-badge">
          Andhare Brothers<br />
          <span></span>
        </div> */}

      </div>

      {/* Search Bar */}
      <div className="search-section">
        {allCategories && (
          <select
            className="select-cat"
            value={selectedCategory || ''}
            onChange={e => {
              const v = e.target.value || null;
              setSelectedCategory(v);
              fetchProducts(v, name, maxPrice, direction);
            }}
          >
            <option value="">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        )}
        <input
          className="search-input"
          style={{ flex: 1, minWidth: '160px' }}
          placeholder="🔍 Search products..."
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchProducts()}
        />
        <input
          className="search-input"
          style={{ width: '160px' }}
          type="number"
          placeholder="Max Price ₹"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
        <button className="sort-btn" onClick={toggleSort}>
          {direction === 'asc' ? '↑ Price: Low→High' : '↓ Price: High→Low'}
        </button>
        <button className="search-btn" onClick={searchProducts}>
          Search
        </button>
      </div>

      {/* Category Cards */}
      {allCategories && allCategories.length > 0 && (
        <>
          <div className="section-title">🏷️ Shop by Category</div>
          <div className="categories-grid">
            <div
              className={`cat-card all-cat ${!selectedCategory ? 'active' : ''}`}
              onClick={() => handleCategoryClick(null)}
            >
              <span className="cat-icon">🛒</span>
              <span className="cat-name">All Items</span>
            </div>
            {allCategories.map(cat => (
              <div
                key={cat}
                className={`cat-card ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <span className="cat-icon">{getCategoryIcon(cat)}</span>
                <span className="cat-name">{cat}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Products */}
      <div className="products-header">
        <div className="section-title" style={{ marginBottom: 0 }}>
          {selectedCategory ? `📦 ${selectedCategory}` : '🌟 All Products'}
        </div>
        {allProducts && (
          <span className="product-count">{allProducts.length} products</span>
        )}
      </div>

      <div className="products-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton" />)
          : allProducts && allProducts.length > 0
          ? allProducts.map(prod => <Product key={prod.id} prod={prod} />)
          : (
            <div className="no-products">
              <span className="no-icon">🔍</span>
              <h5>No products found</h5>
              <p style={{ fontSize: '0.9rem' }}>Try different search terms or category</p>
            </div>
          )
        }
      </div>
    </div>
  );
}