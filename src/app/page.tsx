import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import Gallery from '@/components/Gallery';
import './page.css';
import '../app/portfolio/portfolio.css';
import '../app/contact/contact.css';

const prisma = new PrismaClient();
export const revalidate = 60;

export default async function Home() {
  const images = await prisma.portfolioImage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-bg"></div>
        <div className="hero-content fade-in">
          <Image src="/logo.png" alt="Old School Ink" width={220} height={220} style={{ marginBottom: '3rem' }} priority />
          <h1>ART THAT<br/><span className="highlight">LEAVES A MARK.</span></h1>
          <div className="cta-group">
            <Link href="/book" className="btn">START YOUR JOURNEY</Link>
            <a href="#portfolio" className="btn" style={{ background: 'transparent', borderColor: 'rgba(138, 99, 68, 0.4)' }}>VIEW THE PORTFOLIO</a>
          </div>
        </div>
      </section>

      {/* Intro Section - Classical Grid */}
      <section id="studio" className="intro container fade-in">
        <div className="intro-grid">
          <div className="intro-text">
            <h2 className="highlight">The Studio</h2>
            <p>
              Welcome to the threshold of Old School Ink. We believe that every tattoo is a piece of living history. 
              Our sanctuary specializes in shadow-work realism, traditional archetypes, and surgical fine-line precision.
            </p>
          </div>
          <div className="intro-image">
            <div className="img-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Artist Section - Reversed Layout */}
      <section id="artist" className="intro container fade-in" style={{ background: '#050505', borderTop: 'none' }}>
        <div className="intro-grid">
          <div className="intro-image">
            <div className="img-placeholder" style={{ height: '700px', background: "url('https://images.unsplash.com/photo-1590246814883-578ae11ecbc8?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat" }}></div>
          </div>
          <div className="intro-text">
            <h2 className="highlight">The Artist</h2>
            <p>
              A decade spent in the pursuit of the perfect shadow. We blend ancient tattooing philosophy with surrealist aesthetics to forge armor specifically for your spirit.
            </p>
            <p>
              Driven by an obsessive mastery of detail, we explore the depths of your intent to ensure every etching is a ritualized expression of your inner landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-page container fade-in" style={{ padding: '12rem 2rem', background: '#000' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '5rem' }}>IMAGE <span className="highlight">GALLERY</span></h2>
          <p className="subtitle">Witness the transition from flesh to art.</p>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <a 
            href="https://www.instagram.com/old_school_ink_97" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn"
            style={{ 
              borderColor: 'rgba(138, 99, 68, 0.3)',
              fontSize: '0.9rem',
              padding: '0.8rem 2rem'
            }}
          >
            DISCOVER MORE ON INSTAGRAM
          </a>
        </div>
        
        {images.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#444' }}>The gallery is currently cloaked. Check back soon.</p>
        ) : (
          <Gallery images={images} />
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-page container fade-in" style={{ padding: '12rem 2rem', background: 'linear-gradient(to top, #080808, #000)' }}>
        <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <h2 style={{ fontSize: '4rem' }}>Choose Your <span className="highlight">Path</span></h2>
          <p className="subtitle">Find our sanctuary and prepare for yours.</p>
        </div>

        <div className="contact-grid">
          <section className="faq-section">
            <h2 className="highlight" style={{ fontSize: '2rem', marginBottom: '2rem' }}>SACRED POLICIES</h2>
            <div className="faq-item">
              <h3>The Blood Ritual</h3>
              <p>Ensure you are well-rested, nourished, and hydrated. The body must be strong for the mind to be clear. No alcohol 24 hours prior.</p>
            </div>
            <div className="faq-item">
              <h3>The Covenant</h3>
              <p>All bookings require a non-refundable sacrifice (deposit) to secure your time. We ask for 48 hours notice for any rescheduling.</p>
            </div>
            <div className="faq-item">
              <h3>Ascension & Aftercare</h3>
              <p>Gently cleanse the mark with unscented antibacterial soap. Let the art breathe. Avoid sun and submersion for the first 14 days.</p>
            </div>
          </section>

          <section className="map-section">
            <h2 className="highlight" style={{ fontSize: '2rem', marginBottom: '2rem' }}>LOCATION</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
              <strong>MODERN COMMS:</strong> <a href="tel:+919742980840" style={{ color: 'var(--accent)' }}>+91 9742980840</a>
            </p>
            <p style={{ marginBottom: '2rem' }}># 4, shop, 3, 13th Cross Rd, opposite to KODAVA SAMAJA, Vasanth Nagar, Bengaluru, Karnataka 560001</p>
            <div className="map-container" style={{ border: '1px solid var(--surface-border)', filter: 'grayscale(1) contrast(1.2) brightness(0.8)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6574159152874!2d77.59184397447477!3d12.99374998732371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae172f5885f9d9%3A0xeab254c024ce7c00!2sOld%20School%20Ink!5e0!3m2!1sen!2sin!4v1774602195006!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy">
              </iframe>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
