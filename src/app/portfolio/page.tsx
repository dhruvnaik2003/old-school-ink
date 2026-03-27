import { PrismaClient } from '@prisma/client';
import Gallery from '@/components/Gallery';
import './portfolio.css';

const prisma = new PrismaClient();

export const revalidate = 60;

export default async function Portfolio() {
  const images = await prisma.portfolioImage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="portfolio-page container fade-in" style={{ paddingTop: '100px' }}>
      <h1 style={{textAlign: 'center', fontSize: '4rem', marginBottom: '1rem'}}>Our <span className="highlight">Work</span></h1>
      <p className="subtitle" style={{textAlign: 'center', marginBottom: '2rem'}}>A curated collection of our timeless tattoos.</p>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--foreground-muted)' }}>Checkout some of our new tattoos</p>
        <a 
          href="https://www.instagram.com/old_school_ink_97" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="instagram-btn"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 2rem', 
            fontSize: '1rem', 
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '30px', 
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 4px 15px rgba(204, 35, 102, 0.4)',
            transition: 'transform 0.2s ease'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          Instagram
        </a>
      </div>
      
      {images.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Check back later for new artwork updates.</p>
      ) : (
        <Gallery images={images} />
      )}
    </main>
  );
}
