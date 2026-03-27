import './contact.css';

export default function Contact() {
  return (
    <main className="contact-page container fade-in" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="contact-header">
        <h1>Visit the <span className="highlight">Studio</span></h1>
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
    </main>
  );
}
