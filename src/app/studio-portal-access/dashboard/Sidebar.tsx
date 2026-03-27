"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  const handleLogout = () => {
    document.cookie = 'adminToken=; Max-Age=0; path=/;';
    window.location.href = '/studio-portal-access';
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <Image src="/logo.png" alt="Admin Logo" width={80} height={80} style={{ borderRadius: '8px' }} priority />
        <span>OLD SCHOOL INK</span>
      </div>
      <nav className="admin-nav">
        <Link href="/studio-portal-access/dashboard">Bookings Calendar</Link>
        <Link href="/studio-portal-access/dashboard/portfolio">Portfolio Manager</Link>
        <a href="/" target="_blank">View Live Site</a>
        <button className="btn btn-small" style={{marginTop: 'auto', border: '1px solid var(--surface-border)'}} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </aside>
  );
}
