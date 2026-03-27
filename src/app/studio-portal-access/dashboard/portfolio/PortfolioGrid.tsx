"use client";

import { deletePortfolioImage } from './actions';
import { useState } from 'react';

export default function PortfolioGrid({ images }: { images: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this from the portfolio?')) return;
    setLoadingId(id);
    await deletePortfolioImage(id);
    setLoadingId(null);
  };

  if (images.length === 0) return <p>No images in portfolio yet.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {images.map(img => (
        <div key={img.id} style={{ position: 'relative', background: 'var(--surface)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--surface-border)' }}>
          <img src={img.imageUrl} alt={img.altText || 'Portfolio item'} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '2px', display: 'block' }} />
          <p style={{ fontSize: '0.85rem', margin: '0.5rem 0', color: 'var(--foreground-muted)' }}>{img.altText}</p>
          <button 
            onClick={() => handleDelete(img.id)}
            disabled={loadingId === img.id}
            className="btn btn-small" 
            style={{ width: '100%', background: '#dc2626', padding: '0.4rem' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
