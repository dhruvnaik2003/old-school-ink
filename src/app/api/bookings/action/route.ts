import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendClientBookingUpdate } from '@/lib/email';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const status = searchParams.get('status');
  // For production, you should implement an HMAC signature or admin token authentication here.

  if (!id || !status || (status !== 'APPROVED' && status !== 'CANCELED')) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    const updated = await prisma.booking.update({
      where: { id },
      data: { status }
    });

    // Send the client the automated update based on the inline action
    if (status === 'APPROVED' || status === 'CANCELED') {
      sendClientBookingUpdate(updated, status as any).catch(console.error);
    }

    // Rather than returning raw JSON, let's redirect to a basic success confirmation!
    return new NextResponse(`
      <html>
        <head>
          <title>Booking Action Confirmed</title>
          <style>
            body { background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; text-align: center; }
            h1 { color: #e50914; }
          </style>
        </head>
        <body>
          <div>
            <h1>Success!</h1>
            <p>Booking for ${updated.clientName} has been marked as ${status}.</p>
            <p>The client has automatically been notified.</p>
          </div>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
