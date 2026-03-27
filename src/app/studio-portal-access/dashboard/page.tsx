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

  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div>
          <h2 style={{marginBottom: '1rem', color: 'var(--accent)'}}>Upcoming Bookings</h2>
          <BookingList bookings={bookings} />
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
