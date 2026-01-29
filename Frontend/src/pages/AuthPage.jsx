import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api.js';
import { setToken } from '../auth.js';

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        password: form.password
      };
      if (mode === 'register') {
        payload.name = form.name.trim();
      }

      const data = await apiRequest(`/api/auth/${mode}`, {
        method: 'POST',
        body: payload
      });

      setToken(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="hero">
        <div>
          <p className="eyebrow">Anonymous. Honest. Safe.</p>
          <h1>Sarahah Messages</h1>
          <p className="lead">
            Create your link and receive anonymous feedback. No sign-ins for senders, no noise for you.
          </p>
          <div className="pill-row">
            <button
              type="button"
              className={mode === 'login' ? 'pill active' : 'pill'}
              onClick={() => setMode('login')}
            >
              Log In
            </button>
            <button
              type="button"
              className={mode === 'register' ? 'pill active' : 'pill'}
              onClick={() => setMode('register')}
            >
              Create Account
            </button>
          </div>
        </div>
        <div className="card">
          <h2>{mode === 'login' ? 'Welcome back' : 'Start receiving messages'}</h2>
          <form onSubmit={submit} className="form">
            {mode === 'register' && (
              <label>
                Full name
                <input
                  name="name"
                  type="text"
                  placeholder="Sarah Ahmed"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </label>
            )}
            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                placeholder="At least 8 characters"
                minLength={8}
                value={form.password}
                onChange={onChange}
                required
              />
            </label>
            {error && <div className="error">{error}</div>}
            <button className="primary" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
      <footer className="small">Built for honest, anonymous notes. Keep it kind.</footer>
    </div>
  );
}
