import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  function doLogin(formData) {
    setLoading(true);
    setLoginError(null);
    fetch('http://localhost:8080/api/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',     //post request to bakend
      body: JSON.stringify(formData)  
    })
      .then(resp => {
        if (resp.status === 401) {
          setLoginError('Incorrect email or password. Please try again.');
          setLoading(false);
          return null;
        }
        return resp.json();
      })
      .then(data => {
        if (!data) return;
        const token = data.jwtToken;
        localStorage.setItem('jwtToken', token);
        const decoded = jwtDecode(token);
        const sub = decoded.sub;
        localStorage.setItem('userId', sub.split(',')[0]);
        localStorage.setItem('username', sub.split(',')[2]);
        localStorage.setItem('roles', sub.split('[')[1]);
        window.location.href = 'http://localhost:3000';       
      })
      .catch(() => {
        setLoginError('Something went wrong. Please try again.');
        setLoading(false);
      });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Hind:wght@300;400;500;600&display=swap');
        body { background: #fdf6ec !important; font-family: 'Hind', sans-serif; }
        .auth-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; }
        .auth-card {
          background: #fff; border-radius: 20px; padding: 2.2rem 2rem;
          width: 100%; max-width: 400px;
          border: 1.5px solid #f0e0d0;
          box-shadow: 0 8px 32px rgba(123,28,28,.1);
        }
        .auth-logo { text-align: center; margin-bottom: 1.5rem; }
        .auth-logo-icon { font-size: 2.5rem; display: block; }
        .auth-logo-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #7B1C1C; margin-top: .2rem; }
        .auth-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #2a1a1a; margin: 0 0 1.5rem; text-align: center; }
        .auth-group { margin-bottom: 1rem; }
        .auth-group label { font-size: .83rem; font-weight: 600; color: #5a3a3a; display: block; margin-bottom: .35rem; }
        .auth-group input {
          width: 100%; border: 1.5px solid #e8d5c5; border-radius: 10px;
          padding: .6rem .85rem; font-family: 'Hind', sans-serif; font-size: .93rem;
          background: #fdf6ec; outline: none; box-sizing: border-box; transition: border-color .2s;
        }
        .auth-group input:focus { border-color: #7B1C1C; background: #fff; }
        .auth-error { background: #fde8e8; color: #7B1C1C; border-radius: 8px; padding: .6rem .9rem; font-size: .83rem; margin-bottom: 1rem; border: 1px solid #f5c0c0; }
        .auth-btn {
          width: 100%; background: #7B1C1C; color: #fff; border: none;
          border-radius: 10px; padding: .7rem; font-family: 'Hind', sans-serif;
          font-size: .93rem; font-weight: 600; cursor: pointer; transition: background .2s;
          margin-top: .4rem;
        }
        .auth-btn:hover:not(:disabled) { background: #9b2222; }
        .auth-btn:disabled { opacity: .65; cursor: not-allowed; }
        .auth-footer { text-align: center; margin-top: 1.1rem; font-size: .83rem; color: #8a6a5a; }
        .auth-footer a { color: #7B1C1C; font-weight: 600; text-decoration: none; }
        .auth-footer a:hover { text-decoration: underline; }
        .auth-divider { display: flex; align-items: center; gap: .7rem; margin: 1.2rem 0; color: #ccc; font-size: .8rem; }
        .auth-divider::before, .auth-divider::after { content:''; flex:1; height:1px; background:#f0e0d0; }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">
            <span className="auth-logo-icon">🏺</span>
            <div className="auth-logo-name">Saubhagya Still Bhandar</div>
          </div>
          <h2 className="auth-title">Welcome Back</h2>

          {loginError && <div className="auth-error">{loginError}</div>}

          <form onSubmit={handleSubmit(doLogin)}>
            <div className="auth-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" {...register('email', { required: true })} />
            </div>
            <div className="auth-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" {...register('password', { required: true })} />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? ' Logging in…' : ' Login'}
            </button>
          </form>

          <div className="auth-divider">or</div>
          <div className="auth-footer">
            Don't have an account? <NavLink to="/register">Register now</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}