"use client";

import { blockSlot } from './actions';
import { useState } from 'react';

export default function BlockSlotForm() {
  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('10:00');
  const [toTime, setToTime] = useState('10:00');
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(fromTime) > parseInt(toTime)) {
      alert("From Time cannot be after To Time.");
      return;
    }
    setLoading(true);
    await blockSlot(date, fromTime, toTime, customerName);
    setDate('');
    setCustomerName('');
    setLoading(false);
  };

  const hours = [10,11,12,13,14,15,16,17,18];

  return (
    <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '6px', border: '1px solid var(--surface-border)' }}>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label>Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{ marginBottom: 0 }} />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div className="form-group">
          <label>From</label>
          <select value={fromTime} onChange={e => setFromTime(e.target.value)} required style={{ marginBottom: 0 }}>
            {hours.map(h => {
               const val = `${h.toString().padStart(2, '0')}:00`;
               return <option key={val} value={val}>{val}</option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label>To</label>
          <select value={toTime} onChange={e => setToTime(e.target.value)} required style={{ marginBottom: 0 }}>
            {hours.map(h => {
               const val = `${h.toString().padStart(2, '0')}:00`;
               return <option key={val} value={val}>{val}</option>;
            })}
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Name of Customer</label>
        <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="e.g. John Doe" style={{ marginBottom: 0 }} />
      </div>
      <button type="submit" className="btn btn-small" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
        {loading ? 'Blocking...' : 'Block Slots'}
      </button>
    </form>
  );
}
