import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
  const { register, handleSubmit } = useForm({
    defaultValues: { username: '', email: '', password: '', confirmPassword: '', mobile: '', roles: [] }
  });
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function registerUser(formData) {
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    setFormError(null);
    setLoading(true);
    fetch('http://localhost:8080/api/register', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(data => {
        setLoading(false);
        if (data.status === 400) { setFormError(data.message); }
        else { alert('Registered successfully! Please login.'); navigate('/login'); }
      })
      .catch(() => { setLoading(false); setFormError('Something went wrong. Please try again.'); });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Hind:wght@300;400;500;600&display=swap');
        body { background: #fdf6ec !important; font-family: 'Hind', sans-serif; }
        .auth-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; }
        .auth-card { background: #fff; border-radius: 20px; padding: 2rem; width: 100%; max-width: 420px; border: 1.5px solid #f0e0d0; box-shadow: 0 8px 32px rgba(123,28,28,.1); }
        .auth-logo { text-align: center; margin-bottom: 1.2rem; }
        .auth-logo-icon { font-size: 2.2rem; display: block; }
        .auth-logo-name { font-family: 'Playfair Display', serif; font-size: 1rem; color: #7B1C1C; }
        .auth-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #2a1a1a; margin: 0 0 1.2rem; text-align: center; }
        .auth-group { margin-bottom: .9rem; }
        .auth-group label { font-size: .82rem; font-weight: 600; color: #5a3a3a; display: block; margin-bottom: .3rem; }
        .auth-group input { width: 100%; border: 1.5px solid #e8d5c5; border-radius: 10px; padding: .55rem .8rem; font-family: 'Hind', sans-serif; font-size: .9rem; background: #fdf6ec; outline: none; box-sizing: border-box; transition: border-color .2s; }
        .auth-group input:focus { border-color: #7B1C1C; background: #fff; }
        .auth-error { background: #fde8e8; color: #7B1C1C; border-radius: 8px; padding: .55rem .85rem; font-size: .82rem; margin-bottom: .9rem; border: 1px solid #f5c0c0; }
        .auth-roles { display: flex; gap: 1rem; margin-bottom: .9rem; }
        .role-check { display: flex; align-items: center; gap: .4rem; cursor: pointer; font-size: .86rem; color: #5a3a3a; }
        .role-check input { accent-color: #7B1C1C; width: 16px; height: 16px; }
        .auth-btn { width: 100%; background: #7B1C1C; color: #fff; border: none; border-radius: 10px; padding: .65rem; font-family: 'Hind', sans-serif; font-size: .92rem; font-weight: 600; cursor: pointer; transition: background .2s; margin-top: .3rem; }
        .auth-btn:hover:not(:disabled) { background: #9b2222; }
        .auth-btn:disabled { opacity: .65; cursor: not-allowed; }
        .auth-footer { text-align: center; margin-top: 1rem; font-size: .82rem; color: #8a6a5a; }
        .auth-footer a { color: #7B1C1C; font-weight: 600; text-decoration: none; }
        .auth-footer a:hover { text-decoration: underline; }
        .auth-row { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">
            <span className="auth-logo-icon">🏺</span>
            <div className="auth-logo-name">Saubhagya Still Bhandar</div>
          </div>
          <h2 className="auth-title">Create Account</h2>

          {formError && <div className="auth-error">⚠️ {formError}</div>}

          <form onSubmit={handleSubmit(registerUser)}>
            <div className="auth-group">
              <label>Username *</label>
              <input placeholder="Enter username" {...register('username', { required: true })} />
            </div>
            <div className="auth-row">
              <div className="auth-group">
                <label>Password *</label>
                <input type="password" placeholder="••••••••" {...register('password', { required: true })} />
              </div>
              <div className="auth-group">
                <label>Confirm Password *</label>
                <input type="password" placeholder="••••••••" {...register('confirmPassword', { required: true })} />
              </div>
            </div>
            <div className="auth-row">
              <div className="auth-group">
                <label>Mobile *</label>
                <input type="tel" placeholder="9xxxxxxxxx" {...register('mobile', { required: true })} />
              </div>
              <div className="auth-group">
                <label>Email *</label>
                <input type="email" placeholder="you@example.com" {...register('email', { required: true })} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '.82rem', fontWeight: 600, color: '#5a3a3a', display: 'block', marginBottom: '.4rem' }}>Role</label>
              <div className="auth-roles">
                <label className="role-check">
                  <input type="checkbox" value="ROLE_ADMIN" {...register('roles')} />
                  👑 Admin
                </label>
                <label className="role-check">
                  <input type="checkbox" value="ROLE_USER" {...register('roles')} />
                  👤 User
                </label>
              </div>
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? '⏳ Registering…' : '📝 Register'}
            </button>
          </form>

          <div className="auth-footer">
            Already registered? <NavLink to="/login">Login here</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}