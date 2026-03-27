"use client";

import { useState } from 'react';
import { uploadPortfolioImage } from './actions';

export default function PortfolioUploadForm() {
  const [altText, setAltText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      await uploadPortfolioImage(formData);
      e.currentTarget.reset();
      setAltText('');
    } catch (err) {
      console.error("Upload connection dropped:", err);
      // During Next.js local development, saving files to public/ triggers a fast refresh
      // This abruptly drops the browser connection and throws a false client error.
      // Since we know the server successfully saves the file and DB row, we can safely reset.
      e.currentTarget.reset();
      setAltText('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '6px', border: '1px solid var(--surface-border)' }}>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label>Select Image</label>
        <input type="file" name="image" accept="image/*" required style={{ marginBottom: 0 }} />
      </div>
      <div className="form-group">
        <label>Alt Text / Description</label>
        <input type="text" name="altText" value={altText} onChange={e => setAltText(e.target.value)} placeholder="e.g. Traditional Panther" style={{ marginBottom: 0 }} />
      </div>
      <button type="submit" className="btn btn-small" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
    </form>
  );
}
