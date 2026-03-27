import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">OLD SCHOOL INK</Link>
      <div className="navbar-links">
        <a href="/#portfolio">PORTFOLIO</a>
        <a href="/#contact">INFO & FAQ</a>
        <Link href="/book" className="btn" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>BOOK NOW</Link>
      </div>
    </nav>
  );
}
