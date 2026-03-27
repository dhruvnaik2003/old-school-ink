"use client";

import Link from 'next/link';

export default function Sidebar() {
  const handleLogout = () => {
    document.cookie = 'adminToken=; Max-Age=0; path=/;';
    window.location.href = '/studio-portal-access';
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">OLD SCHOOL INK ADMIN</div>
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
