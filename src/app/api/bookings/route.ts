import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { put } from '@vercel/blob';
import { sendAdminNewBookingAlert, sendClientBookingUpdate } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const clientName = formData.get('clientName') as string;
    const clientEmail = formData.get('clientEmail') as string;
    const clientPhone = formData.get('clientPhone') as string;
    const placement = formData.get('placement') as string;
    const size = formData.get('size') as string;
    const description = formData.get('description') as string;
    const datetime = formData.get('datetime') as string;
    const image = formData.get('referenceImage') as File | null;

    let referenceImage = null;

    if (image && image.name) {
      const uniqueName = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
      
      const blobInfo = await put(uniqueName, image, {
        access: 'public',
      });
      referenceImage = blobInfo.url;
    }

    const bookingDate = new Date(datetime);
    
    const existing = await prisma.booking.findFirst({
      where: {
        date: bookingDate,
        status: { in: ['PENDING', 'APPROVED'] }
      }
    });

    if (existing) {
      return NextResponse.json({ error: 'Slot is already booked and unavailable.' }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        placement,
        size,
        description,
        date: bookingDate,
        referenceImage,
        status: 'PENDING'
      }
    });

    // Send emails async
    sendAdminNewBookingAlert(booking).catch(console.error);
    sendClientBookingUpdate(booking, 'RECEIVED').catch(console.error);

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
