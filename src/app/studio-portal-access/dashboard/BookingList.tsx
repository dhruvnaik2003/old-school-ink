"use client";

import { updateBookingStatus, unblockSlot } from './actions';
import { useState } from 'react';

export default function BookingList({ bookings }: { bookings: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const handleStatusUpdate = async (id: string, status: string, isBlockedSlot?: boolean) => {
    if (status === 'CANCELED') {
      setCancelingId(id);
    }
    setLoadingId(id);
    
    if (isBlockedSlot && status === 'CANCELED') {
      await unblockSlot(id);
    } else {
      await updateBookingStatus(id, status);
    }
    
    setLoadingId(null);
  };

  const activeBookings = bookings.filter(b => b.status !== 'CANCELED');
  if (activeBookings.length === 0 && cancelingId === null) return <p>No bookings found.</p>;

  return (
    <div>
      {bookings.map(booking => {
        if (booking.status === 'CANCELED' && booking.id !== cancelingId) return null;
        
        return (
          <div 
            key={booking.id} 
            className="booking-card"
            style={{ 
              opacity: cancelingId === booking.id ? 0 : 1, 
              transition: 'opacity 0.4s ease',
              pointerEvents: cancelingId === booking.id ? 'none' : 'auto'
            }}
          >
            <div className="booking-info">
            <h3>{booking.clientName} - {new Date(booking.date).toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'medium', timeStyle: 'short' })}</h3>
            <span className={`status-badge status-${booking.status}`}>{booking.status}</span>
            <p><strong>Email:</strong> {booking.clientEmail} | <strong>Phone:</strong> {booking.clientPhone}</p>
            <p><strong>Placement:</strong> {booking.placement} | <strong>Size:</strong> {booking.size}</p>
            <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: '#ccc' }}>"{booking.description}"</p>
            {booking.referenceImage && (
              <a href={booking.referenceImage} target="_blank" style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '0.5rem', display: 'inline-block' }}>View Reference Image</a>
            )}
          </div>
          <div className="booking-actions">
            {booking.status === 'PENDING' && (
              <>
                <button 
                  className="btn btn-small" 
                  onClick={() => handleStatusUpdate(booking.id, 'APPROVED')}
                  disabled={loadingId === booking.id}
                  style={{ background: '#059669' }}>
                  Approve
                </button>
                <button 
                  className="btn btn-small" 
                  onClick={() => handleStatusUpdate(booking.id, 'CANCELED')}
                  disabled={loadingId === booking.id}
                  style={{ background: '#dc2626' }}>
                  Reject
                </button>
              </>
            )}
            {booking.status === 'APPROVED' && (
              <button 
                className="btn btn-small" 
                onClick={() => handleStatusUpdate(booking.id, 'CANCELED')}
                disabled={loadingId === booking.id}
                style={{ background: '#dc2626' }}>
                Reject
              </button>
            )}
            {booking.isBlockedSlot && (
              <button 
                className="btn btn-small" 
                onClick={() => handleStatusUpdate(booking.id, 'CANCELED', true)}
                disabled={loadingId === booking.id}
                style={{ background: '#4b5563' }}>
                Unblock Slot
              </button>
            )}
          </div>
        </div>
      );
    })}
    </div>
  );
}
