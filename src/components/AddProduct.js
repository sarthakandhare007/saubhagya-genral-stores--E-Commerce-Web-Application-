import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CATEGORY_SUGGESTIONS = [
  'Cookware', 'Plates & Thalis', 'Glasses & Tumblers', 'Bowls & Vatis',
  'Tiffin Boxes', 'Spoons & Ladles', 'Pressure Cookers', 'Storage Containers',
  'Tea & Coffee', 'Puja Items',
];

export default function AddProduct() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const [imgError, setImgError] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [showCatSuggestions, setShowCatSuggestions] = useState(false);

  const imageUrl = watch('imageUrl', '');
  const productName = watch('name', '');
  const price = watch('price', '');
  const mrp = watch('mrp', '');
  const categoryVal = watch('category', '');

  useEffect(() => { setImgError(false); }, [imageUrl]);

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'addprod-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

      *, *::before, *::after { box-sizing: border-box; }

      :root {
        --bg: #F8F5F0;
        --surface: #FFFFFF;
        --border: rgba(0,0,0,0.1);
        --accent: #C8712A;
        --accent-light: #FFF3E8;
        --accent-dark: #9C5318;
        --dark: #1A1A18;
        --text: #2D2D2B;
        --muted: #7A7A75;
        --steel: #3B5A72;
        --steel-light: #EBF2F7;
        --success: #2E6E44;
        --success-light: #E8F5EE;
        --error-c: #C0392B;
        --error-light: #FEF0EE;
        --r: 12px;
        --r-sm: 8px;
        --shadow: 0 2px 16px rgba(28,26,24,0.09);
        --shadow-lg: 0 8px 40px rgba(28,26,24,0.14);
      }

      body {
        font-family: 'DM Sans', sans-serif !important;
        background: var(--bg) !important;
        color: var(--text);
        margin: 0;
      }

      .ap-page {
        min-height: 100vh; background: var(--bg);
        display: flex; align-items: flex-start; justify-content: center;
        padding: 2rem 1rem 4rem;
      }
      .ap-wrapper { width: 100%; max-width: 920px; animation: fadeUp 0.4s ease both; }
      @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

      .ap-header {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 1.75rem;
      }
      .ap-back {
        display: flex; align-items: center; gap: 6px;
        background: var(--surface); border: 1px solid var(--border);
        border-radius: 20px; padding: 0.4rem 0.9rem;
        font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500;
        color: var(--muted); cursor: pointer; transition: all 0.18s;
      }
      .ap-back:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
      .ap-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 900; color: var(--dark); margin: 0; line-height: 1.1; }
      .ap-title em { color: var(--accent); font-style: normal; }
      .ap-subtitle { font-size: 0.8rem; color: var(--muted); margin-top: 3px; text-align: right; }

      .ap-layout { display: grid; grid-template-columns: 1fr 330px; gap: 1.25rem; align-items: start; }

      .ap-form-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); box-shadow: var(--shadow); overflow: hidden; }
      .ap-form-section { padding: 1.4rem 1.5rem; border-bottom: 1px solid var(--border); }
      .ap-form-section:last-child { border-bottom: none; }
      .ap-section-label {
        font-size: 0.67rem; font-weight: 700; letter-spacing: 0.1em;
        text-transform: uppercase; color: var(--accent);
        margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;
      }
      .ap-section-label::after { content:''; flex:1; height:1px; background:var(--border); }

      .ap-field { margin-bottom: 1rem; }
      .ap-field:last-child { margin-bottom: 0; }
      .ap-label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--text); margin-bottom: 0.35rem; }
      .ap-label .req { color: var(--accent); margin-left: 2px; }

      .ap-input, .ap-textarea {
        width: 100%; border: 1.5px solid var(--border); border-radius: var(--r-sm);
        padding: 0.6rem 0.85rem; font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
        background: var(--bg); color: var(--text); outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .ap-input:focus, .ap-textarea:focus {
        border-color: var(--accent); background: #fff;
        box-shadow: 0 0 0 3px rgba(200,113,42,0.12);
      }
      .ap-input.err { border-color: var(--error-c); }
      .ap-input.err:focus { box-shadow: 0 0 0 3px rgba(192,57,43,0.1); }
      .ap-textarea { resize: vertical; min-height: 80px; }
      .ap-error-msg { font-size: 0.73rem; color: var(--error-c); margin-top: 0.3rem; }

      .ap-price-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
      .ap-price-wrap { position: relative; }
      .ap-currency { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); font-size: 0.88rem; font-weight: 600; color: var(--muted); pointer-events: none; }
      .ap-price-wrap .ap-input { padding-left: 1.6rem; }
      .ap-disc-pill {
        display: inline-flex; align-items: center; gap: 4px;
        background: var(--success-light); color: var(--success);
        font-size: 0.72rem; font-weight: 700; padding: 3px 9px;
        border-radius: 12px; margin-top: 0.6rem;
      }

      .ap-cat-wrap { position: relative; }
      .ap-cat-dropdown {
        position: absolute; top: calc(100% + 4px); left: 0; right: 0;
        background: var(--surface); border: 1.5px solid var(--border);
        border-radius: var(--r-sm); box-shadow: var(--shadow-lg);
        z-index: 200; max-height: 200px; overflow-y: auto;
      }
      .ap-cat-opt {
        padding: 0.55rem 0.85rem; font-size: 0.84rem; cursor: pointer;
        transition: background 0.15s; display: flex; align-items: center; gap: 8px;
      }
      .ap-cat-opt:hover { background: var(--accent-light); color: var(--accent-dark); }

      .ap-img-hint { font-size: 0.73rem; color: var(--muted); margin-top: 0.35rem; line-height: 1.5; }

      .ap-how-to {
        margin-top: 0.75rem; background: var(--steel-light);
        border-radius: var(--r-sm); overflow: hidden;
      }
      .ap-how-to summary {
        padding: 0.6rem 0.85rem; font-size: 0.78rem; color: var(--steel);
        cursor: pointer; font-weight: 600; user-select: none; list-style: none;
      }
      .ap-how-to summary::-webkit-details-marker { display: none; }
      .ap-how-to summary:hover { background: rgba(59,90,114,0.08); }
      .ap-how-to-body { padding: 0.75rem 0.85rem 0.85rem; font-size: 0.78rem; color: var(--text); line-height: 1.7; border-top: 1px solid rgba(59,90,114,0.12); }
      .ap-how-to-body ol { margin: 0; padding-left: 1.2rem; }
      .ap-how-to-body li { margin-bottom: 0.2rem; }
      .ap-how-to-note { margin-top: 0.6rem; font-size: 0.71rem; color: var(--muted); }

      .ap-submit-btn {
        width: 100%; background: var(--accent); border: none; color: #fff;
        border-radius: var(--r-sm); padding: 0.85rem;
        font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 700;
        cursor: pointer; transition: background 0.2s, transform 0.15s;
        display: flex; align-items: center; justify-content: center; gap: 8px;
      }
      .ap-submit-btn:hover:not(:disabled) { background: var(--accent-dark); transform: translateY(-1px); }
      .ap-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

      .ap-status {
        margin-top: 0.85rem; border-radius: var(--r-sm);
        padding: 0.7rem 1rem; font-size: 0.84rem; font-weight: 500;
        display: flex; align-items: center; gap: 8px;
      }
      .ap-status.success { background: var(--success-light); color: var(--success); }
      .ap-status.error { background: var(--error-light); color: var(--error-c); }

      /* PREVIEW */
      .ap-preview-card {
        background: var(--surface); border: 1px solid var(--border);
        border-radius: var(--r); box-shadow: var(--shadow);
        overflow: hidden; position: sticky; top: 1.5rem;
      }
      .ap-preview-header {
        background: var(--dark); padding: 0.8rem 1.1rem;
        font-size: 0.67rem; font-weight: 700; letter-spacing: 0.1em;
        text-transform: uppercase; color: rgba(255,255,255,0.45);
        display: flex; align-items: center; gap: 6px;
      }
      .ap-preview-header .pdot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
      .ap-preview-img-box {
        width: 100%; height: 220px; background: var(--bg);
        display: flex; align-items: center; justify-content: center;
        position: relative; overflow: hidden;
      }
      .ap-preview-img-box img { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s; }
      .ap-preview-ph { display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--muted); }
      .ap-preview-ph-icon { font-size: 2.8rem; opacity: 0.35; }
      .ap-preview-ph-text { font-size: 0.76rem; opacity: 0.6; }
      .ap-preview-img-err {
        position: absolute; inset: 0; background: var(--bg);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 8px; padding: 1rem; text-align: center;
      }
      .ap-preview-img-err .eico { font-size: 2rem; opacity: 0.45; }
      .ap-preview-img-err .etxt { font-size: 0.74rem; color: var(--error-c); line-height: 1.4; max-width: 200px; }
      .ap-preview-body { padding: 1rem 1.1rem; }
      .ap-preview-cat { font-size: 0.67rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.35rem; }
      .ap-preview-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: var(--dark); line-height: 1.3; margin-bottom: 0.55rem; min-height: 1.4em; }
      .ap-preview-name.ph { color: var(--muted); font-style: italic; font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 0.82rem; }
      .ap-preview-prices { display: flex; align-items: baseline; gap: 7px; margin-bottom: 0.8rem; flex-wrap: wrap; }
      .ap-preview-price { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--accent); }
      .ap-preview-mrp { font-size: 0.8rem; color: var(--muted); text-decoration: line-through; }
      .ap-preview-disc { font-size: 0.7rem; font-weight: 700; color: var(--success); background: var(--success-light); padding: 2px 7px; border-radius: 10px; }
      .ap-preview-btn { width: 100%; background: var(--dark); border: none; color: #fff; border-radius: var(--r-sm); padding: 0.62rem; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 600; opacity: 0.75; cursor: default; }
      .ap-preview-note { text-align: center; font-size: 0.7rem; color: var(--muted); margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border); }

      @keyframes spin { to { transform: rotate(360deg); } }
      .spin { width: 16px; height: 16px; border: 2.5px solid rgba(255,255,255,0.35); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }

      @media (max-width: 768px) {
        .ap-layout { grid-template-columns: 1fr; }
        .ap-preview-card { position: static; order: -1; }
        .ap-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        .ap-subtitle { text-align: left; }
        .ap-price-row { grid-template-columns: 1fr 1fr; }
      }
    `;
    document.head.appendChild(style);
    return () => { const el = document.getElementById('addprod-styles'); if (el) el.remove(); };
  }, []);

  const discount = price && mrp && Number(mrp) > Number(price)
    ? Math.round((1 - Number(price) / Number(mrp)) * 100) : 0;

  const filteredCats = CATEGORY_SUGGESTIONS.filter(c =>
    c.toLowerCase().includes((categoryVal || '').toLowerCase())
  );

  async function addNewProduct(formData) {
    setSubmitStatus(null);
    const token = localStorage.getItem('jwtToken');
    try {
      const resp = await fetch('http://localhost:8080/api/products', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          mrp: formData.mrp ? Number(formData.mrp) : undefined,
        }),
      });
      if (resp.status === 201) {
        setSubmitStatus('success');
        setTimeout(() => navigate('/'), 1400);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  }

  return (
    <div className="ap-page">
      <div className="ap-wrapper">

        {/* HEADER */}
        <div className="ap-header">
          <button className="ap-back" onClick={() => navigate('/')}>← Back to Shop</button>
          <div>
            <h1 className="ap-title">Add <em>New</em> Product</h1>
            <div className="ap-subtitle">Preview updates live as you type →</div>
          </div>
        </div>

        <div className="ap-layout">

          {/* ── FORM ── */}
          <div className="ap-form-card">
            <form onSubmit={handleSubmit(addNewProduct)}>

              {/* BASIC */}
              <div className="ap-form-section">
                <div className="ap-section-label">Basic Info</div>

                <div className="ap-field">
                  <label className="ap-label">Product Name <span className="req">*</span></label>
                  <input
                    className={`ap-input${errors.name ? ' err' : ''}`}
                    placeholder="product Name"
                    {...register('name', { required: 'Product name is required' })}
                  />
                  {errors.name && <div className="ap-error-msg"> {errors.name.message}</div>}
                </div>

                <div className="ap-field">
                  <label className="ap-label">Category <span className="req">*</span></label>
                  <div className="ap-cat-wrap">
                    <input
                      className={`ap-input${errors.category ? ' err' : ''}`}
                      placeholder="e.g. Cookware (or pick from list)"
                      autoComplete="off"
                      onFocus={() => setShowCatSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowCatSuggestions(false), 160)}
                      {...register('category', { required: 'Category is required' })}
                    />
                    {showCatSuggestions && filteredCats.length > 0 && (
                      <div className="ap-cat-dropdown">
                        {filteredCats.map(cat => (
                          <div
                            key={cat}
                            className="ap-cat-opt"
                            onMouseDown={() => { setValue('category', cat, { shouldValidate: true }); setShowCatSuggestions(false); }}
                          >
                            {cat}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.category && <div className="ap-error-msg">{errors.category.message}</div>}
                </div>

                <div className="ap-field">
                  <label className="ap-label">Description</label>
                  <textarea
                    className="ap-textarea"
                    placeholder="Material, size, use-case, special features..."
                    rows={3}
                    {...register('description')}
                  />
                </div>
              </div>

              {/* PRICING */}
              <div className="ap-form-section">
                <div className="ap-section-label">Pricing</div>
                <div className="ap-price-row">
                  <div className="ap-field" style={{ marginBottom: 0 }}>
                    <label className="ap-label">Selling Price <span className="req">*</span></label>
                    <div className="ap-price-wrap">
                      <span className="ap-currency">₹</span>
                      <input
                        className={`ap-input${errors.price ? ' err' : ''}`}
                        type="number" placeholder="0" min="1"
                        {...register('price', { required: 'Price is required', min: { value: 1, message: 'Must be > 0' } })}
                      />
                    </div>
                    {errors.price && <div className="ap-error-msg">⚠ {errors.price.message}</div>}
                  </div>
                  <div className="ap-field" style={{ marginBottom: 0 }}>
                    <label className="ap-label">MRP (original price)</label>
                    <div className="ap-price-wrap">
                      <span className="ap-currency">₹</span>
                      <input
                        className="ap-input"
                        type="number" placeholder="0" min="0"
                        {...register('mrp')}
                      />
                    </div>
                  </div>
                </div>
                {discount > 0 && (
                  <div className="ap-disc-pill">✓ {discount}% discount badge will show on the product card</div>
                )}
              </div>

              {/* IMAGE */}
              <div className="ap-form-section">
                <div className="ap-section-label">Product Image</div>
                <div className="ap-field">
                  <label className="ap-label">Image URL</label>
                  <input
                    className="ap-input"
                    type="url"
                    placeholder="https://example.com/product-image.jpg"
                    {...register('imageUrl')}
                  />
                  {/* <div className="ap-img-hint">
                    💡 Paste any direct image URL. Google Images, Amazon, Flipkart product images all work.
                  </div> */}
                </div>

                {/* <details className="ap-how-to">
                  <summary>📌 How to get a Google Image URL?</summary>
                  <div className="ap-how-to-body">
                    <ol>
                      <li>Go to <strong>images.google.com</strong> and search for the product</li>
                      <li>Click an image to open the side panel</li>
                      <li>Right-click the image → <strong>"Open image in new tab"</strong></li>
                      <li>Copy the full URL from the address bar and paste it above</li>
                    </ol>
                    <div className="ap-how-to-note">
                      ⚠ Some Google Images block hotlinking — if the preview shows an error, try a direct product site image instead (e.g. Amazon, Flipkart).
                    </div>
                  </div>
                </details> */}
              </div>

              {/* SUBMIT */}
              <div className="ap-form-section">
                <button type="submit" className="ap-submit-btn" disabled={isSubmitting}>
                  {isSubmitting
                    ? <><span className="spin" /> Adding Product...</>
                    : '＋ Add Product to Shop'
                  }
                </button>
                {submitStatus === 'success' && (
                  <div className="ap-status success">✓ Product added! Redirecting to shop...</div>
                )}
                {submitStatus === 'error' && (
                  <div className="ap-status error">✗ Something went wrong. Please check your connection and try again.</div>
                )}
              </div>

            </form>
          </div>

          {/* ── LIVE PREVIEW ── */}
          <div className="ap-preview-card">
            <div className="ap-preview-header">
              <span className="pdot" /> Live Preview
            </div>

            <div className="ap-preview-img-box">
              {imageUrl && !imgError ? (
                <img
                  src={imageUrl}
                  alt="preview"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onLoad={() => setImgError(false)}
                  onError={() => setImgError(true)}
                />
              ) : imgError ? (
                <div className="ap-preview-img-err">
                  <span className="eico"></span>
                  <span className="etxt">
                    Image could not load. Use a direct link ending in .jpg / .png / .webp, or try opening the image in a new tab first.
                  </span>
                </div>
              ) : (
                <div className="ap-preview-ph">
                  <span className="ap-preview-ph-icon"></span>
                  <span className="ap-preview-ph-text">Image preview appears here</span>
                </div>
              )}
            </div>

            <div className="ap-preview-body">
              <div className="ap-preview-cat">{categoryVal || 'Category'}</div>
              <div className={`ap-preview-name${!productName ? ' ph' : ''}`}>
                {productName || 'Product name will appear here'}
              </div>
              <div className="ap-preview-prices">
                <span className="ap-preview-price">
                  {price ? `₹${Number(price).toLocaleString('en-IN')}` : '₹—'}
                </span>
                {mrp && Number(mrp) > 0 && (
                  <span className="ap-preview-mrp">₹{Number(mrp).toLocaleString('en-IN')}</span>
                )}
                {discount > 0 && <span className="ap-preview-disc">-{discount}%</span>}
              </div>
              <button className="ap-preview-btn" disabled>Add to Cart</button>
              <div className="ap-preview-note">This is how the product card will look in your shop</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}