"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand" onClick={() => setIsOpen(false)}>OLD SCHOOL INK</Link>
      
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </>
          )}
        </svg>
      </button>

      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <a href="/#portfolio" onClick={() => setIsOpen(false)}>PORTFOLIO</a>
        <a href="/#contact" onClick={() => setIsOpen(false)}>INFO & FAQ</a>
        <Link href="/book" className="btn" style={{ padding: '0.6rem 2rem', fontSize: '1rem' }} onClick={() => setIsOpen(false)}>BOOK NOW</Link>
      </div>
    </nav>
  );
}
