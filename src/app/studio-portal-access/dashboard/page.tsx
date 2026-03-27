import { PrismaClient } from '@prisma/client';
import BookingList from './BookingList';
import BlockSlotForm from './BlockSlotForm';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const bookings = await prisma.booking.findMany({
    where: {
      status: { not: 'CANCELED' }
    },
    orderBy: { date: 'asc' }
  });

  const blockedSlots = await prisma.blockedSlot.findMany({
    orderBy: { date: 'asc' }
  });

  const mergedEvents = [
    ...bookings,
    ...blockedSlots.map(slot => ({
      id: slot.id,
      clientName: slot.reason || 'Blocked Slot',
      clientEmail: 'N/A',
      clientPhone: 'N/A',
      placement: 'Manual',
      size: 'N/A',
      description: 'Admin manually blocked slot against walk-ins.',
      date: slot.date,
      status: 'BLOCKED',
      isBlockedSlot: true
    }))
  ].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>
      
      <div className="dashboard-grid">
        <div>
          <h2 style={{marginBottom: '1rem', color: 'var(--accent)'}}>Upcoming Bookings</h2>
          <BookingList bookings={mergedEvents} />
        </div>
        
        <div>
          <h2 style={{marginBottom: '1rem', color: 'var(--accent)'}}>Manual Slot Blocking</h2>
          <p style={{marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--foreground-muted)'}}>Block specific dates/times against walk-ins or absence.</p>
          <BlockSlotForm />
        </div>
      </div>
    </>
  );
}
