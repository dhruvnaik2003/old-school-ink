"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { sendClientBookingUpdate } from '@/lib/email';

const prisma = new PrismaClient();

export async function updateBookingStatus(id: string, status: string) {
  const updated = await prisma.booking.update({
    where: { id },
    data: { status }
  });

  if (status === 'APPROVED' || status === 'CANCELED' || status === 'RESCHEDULED') {
    sendClientBookingUpdate(updated, status as any).catch(console.error);
  }

  revalidatePath('/studio-portal-access/dashboard');
}

export async function blockSlot(dateStr: string, fromTime: string, toTime: string, reason: string) {
  const startHour = parseInt(fromTime.split(':')[0]);
  const endHour = parseInt(toTime.split(':')[0]);

  for (let i = startHour; i <= endHour; i++) {
    const timeStr = `${i.toString().padStart(2, '0')}:00`;
    const dateStrFull = `${dateStr}T${timeStr}:00.000Z`;
    const date = new Date(dateStrFull);

    await prisma.blockedSlot.create({
      data: {
        date,
        reason
      }
    });
  }

  revalidatePath('/studio-portal-access/dashboard');
}

export async function unblockSlot(id: string) {
  await prisma.blockedSlot.delete({
    where: { id }
  });
  revalidatePath('/studio-portal-access/dashboard');
}
