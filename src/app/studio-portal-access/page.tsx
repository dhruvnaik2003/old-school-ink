"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      router.push('/studio-portal-access/dashboard');
    } else {
      const data = await res.json();
      setError(data.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper fade-in">
      <div className="admin-login-card">
        <h2>Studio Portal Access</h2>
        {error && <div className="error-banner" style={{marginBottom: '1rem'}}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn submit-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Enter Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}
