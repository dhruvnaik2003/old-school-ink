import Link from 'next/link';
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
          <h1>Art That<br/><span className="highlight">Leaves a Mark.</span></h1>
          <p className="subtitle">High-end custom tattooing and piercing in the heart of the city.</p>
          <div className="cta-group">
            <Link href="/book" className="btn">Book a Consultation</Link>
            <a href="#portfolio" className="btn-outline">View Portfolio</a>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="studio" className="intro container">
        <div className="intro-grid">
          <div className="intro-text fade-in">
            <h2>The Studio</h2>
            <p>
              Welcome to Old School Ink. We believe that every tattoo tells a story. Our award-winning artists 
              specialize in a variety of styles including black and grey realism, traditional, and 
              fine-line micro tattoos.
            </p>
            <p>
              We maintain the highest standards of hygiene and work closely with each client to 
              deliver a piece of art they will cherish forever.
            </p>
          </div>
          <div className="intro-image fade-in">
            <div className="img-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-page container fade-in" style={{ paddingTop: '4rem', paddingBottom: '4rem', scrollMarginTop: '100px' }}>
        <h2 style={{textAlign: 'center', fontSize: '4rem', marginBottom: '1rem'}}>Our <span className="highlight">Work</span></h2>
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-page container fade-in" style={{ paddingTop: '4rem', paddingBottom: '4rem', scrollMarginTop: '100px' }}>
        <div className="contact-header" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '4rem' }}>Visit the <span className="highlight">Studio</span></h2>
          <p className="subtitle">Find us and prepare for your appointment.</p>
        </div>

        <div className="contact-grid">
          <section className="faq-section">
            <h2>Policies & FAQ</h2>
            <div className="faq-item">
              <h3>How do I prepare for my appointment?</h3>
              <p>Ensure you are well-rested, have eaten a good meal, and are fully hydrated. Do not consume alcohol 24 hours prior.</p>
            </div>
            <div className="faq-item">
              <h3>What is your deposit policy?</h3>
              <p>All bookings require a non-refundable deposit which goes towards the final cost of your tattoo. Rescheduling requires 48-hour notice.</p>
            </div>
            <div className="faq-item">
              <h3>Aftercare Instructions</h3>
              <p>Keep the bandage on for 2-4 hours. Wash gently with unscented antibacterial soap. Apply a thin layer of recommended ointment 2-3 times a day for two weeks. Avoid sun, swimming, and picking.</p>
            </div>
            <div className="faq-item">
              <h3>Can I bring a friend?</h3>
              <p>Due to limited space and health regulations, we ask that you come to your appointment alone unless medically necessary.</p>
            </div>
          </section>

          <section className="map-section">
            <h2>Location & Contact</h2>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Phone:</strong> <a href="tel:+919742980840" style={{ color: 'var(--foreground)', textDecoration: 'none' }}>+91 9742980840</a>
            </p>
            <p># 4, shop, 3, 13th Cross Rd, opposite to KODAVA SAMAJA, Vasanth Nagar, Bengaluru, Karnataka 560001</p>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6574159152874!2d77.59184397447477!3d12.99374998732371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae172f5885f9d9%3A0xeab254c024ce7c00!2sOld%20School%20Ink!5e0!3m2!1sen!2sin!4v1774602195006!5m2!1sen!2sin" 
                width="100%" 
                height="400" 
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
