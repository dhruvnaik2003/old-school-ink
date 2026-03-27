import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isDashboardRoute = path.startsWith('/studio-portal-access/dashboard');

  if (isDashboardRoute) {
    const token = request.cookies.get('adminToken')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/studio-portal-access', request.url));
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.adminId) {
      return NextResponse.redirect(new URL('/studio-portal-access', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio-portal-access/dashboard/:path*'],
};
