import BookingForm from '@/components/BookingForm';
import './book.css';

export default function Book() {
  return (
    <main className="book-page container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="book-header fade-in">
        <h1>Book an <span className="highlight">Appointment</span></h1>
        <p className="subtitle">Select a date and tell us about your vision.</p>
      </div>
      
      <div className="book-content">
        <BookingForm />
      </div>
    </main>
  );
}
