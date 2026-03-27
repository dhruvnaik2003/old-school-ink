"use client";

import { useState, useEffect } from 'react';

const WORK_HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18]; // 10 AM to 6 PM

export default function BookingForm() {
  const [date, setDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!date) {
      setAvailableSlots([]);
      setSelectedTime('');
      return;
    }

    const fetchSlots = async () => {
      try {
        const res = await fetch(`/api/bookings/slots?date=${date}`);
        const data = await res.json();
        const unavailable = data.unavailable || [];
        
        const slots: string[] = [];
        for (const hour of WORK_HOURS) {
          const slotIso = new Date(`${date}T${hour.toString().padStart(2, '0')}:00:00.000Z`).toISOString();
          if (!unavailable.includes(slotIso)) {
             slots.push(slotIso);
          }
        }
        setAvailableSlots(slots);
        setSelectedTime('');
      } catch (err) {
        console.error('Failed to fetch slots', err);
      }
    };

    fetchSlots();
  }, [date]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !selectedTime) {
      setError('Please select a date and time.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('datetime', selectedTime);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit booking');

      setSuccess(true);
      form.reset();
      setDate('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="success-message fade-in">
        <h2>Booking Request Sent!</h2>
        <p>We'll review your request and get back to you soon.</p>
        <button className="btn" onClick={() => setSuccess(false)}>Book Another Session</button>
      </div>
    );
  }

  return (
    <form className="booking-form fade-in" onSubmit={handleSubmit}>
      {error && <div className="error-banner">{error}</div>}
      
      <div className="form-group">
        <label>Select Date</label>
        <input 
          type="date" 
          value={date} 
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </div>

      {date && (
        <div className="form-group">
          <label>Available Time Slots</label>
          <div className="slots-grid">
            {availableSlots.length === 0 ? (
              <p>No slots available for this date.</p>
            ) : (
              availableSlots.map(slot => {
                const hourStr = new Date(slot).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
                return (
                  <button 
                    type="button" 
                    key={slot}
                    className={`slot-btn ${selectedTime === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {hourStr}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="clientName" required placeholder="John Doe" />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="clientEmail" required placeholder="john@example.com" />
        </div>
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input type="tel" name="clientPhone" required placeholder="+1 234 567 8900" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Tattoo Placement</label>
          <input type="text" name="placement" required placeholder="e.g. Left Forearm" />
        </div>
        <div className="form-group">
          <label>Approx. Size</label>
          <input type="text" name="size" required placeholder="e.g. 4x4 inches" />
        </div>
      </div>

      <div className="form-group">
        <label>Design Description / Idea</label>
        <textarea name="description" rows={4} required placeholder="Describe your tattoo idea in detail..."></textarea>
      </div>

      <div className="form-group file-upload">
        <label>Reference Image (Optional)</label>
        <input type="file" name="referenceImage" accept="image/*" />
      </div>

      <button type="submit" className="btn submit-btn" disabled={isSubmitting || !selectedTime}>
        {isSubmitting ? 'Submitting...' : 'Request Booking'}
      </button>
    </form>
  );
}
