"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { put, del } from '@vercel/blob';

const prisma = new PrismaClient();

export async function uploadPortfolioImage(formData: FormData) {
  const file = formData.get('image') as File | null;
  const altText = formData.get('altText') as string;

  if (!file || !file.name) {
    throw new Error('Image is required');
  }

  const uniqueName = `portfolio-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  
  const blobInfo = await put(uniqueName, file, { access: 'public' });
  const imageUrl = blobInfo.url;

  await prisma.portfolioImage.create({
    data: {
      imageUrl,
      altText
    }
  });

  revalidatePath('/portfolio');
  revalidatePath('/studio-portal-access/dashboard/portfolio');
}

export async function deletePortfolioImage(id: string) {
  const image = await prisma.portfolioImage.findUnique({
    where: { id }
  });

  if (image && image.imageUrl) {
    try {
      await del(image.imageUrl);
    } catch (e) {
      console.error('Failed to delete blob', e);
    }
  }

  await prisma.portfolioImage.delete({
    where: { id }
  });

  revalidatePath('/portfolio');
  revalidatePath('/studio-portal-access/dashboard/portfolio');
}
