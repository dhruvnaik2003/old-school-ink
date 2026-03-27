import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date'); // YYYY-MM-DD

  if (!dateStr) return NextResponse.json({ error: 'Date is required' }, { status: 400 });

  const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
  const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        date: { gte: startOfDay, lte: endOfDay },
        status: { in: ['PENDING', 'APPROVED'] }
      },
      select: { date: true }
    });

    const blockedSlots = await prisma.blockedSlot.findMany({
      where: {
        date: { gte: startOfDay, lte: endOfDay },
      },
      select: { date: true }
    });

    const bookedTimes = bookings.map(b => b.date.toISOString());
    const blockedTimes = blockedSlots.map(b => b.date.toISOString());

    const unavailable = [...bookedTimes, ...blockedTimes];
    return NextResponse.json({ unavailable });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
  }
}
