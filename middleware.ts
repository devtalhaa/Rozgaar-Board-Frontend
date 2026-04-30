import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Protect Dashboard and Admin routes from unauthenticated users
  if (!token) {
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // If token exists, prevent logged in users from seeing login/register pages
  if (pathname === '/login' || pathname === '/register') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Attempt to decode role for Role-Based Access Enforcement efficiently at Edge
  try {
    const payloadBase64 = token.split('.')[1];
    if (payloadBase64) {
      // Standardize base64url to base64 native
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const payloadStr = Buffer.from(base64, 'base64').toString('utf-8');
      const payload = JSON.parse(payloadStr);
      const role = payload.role;

      // Restrict cross-role dashboard access
      if (pathname.startsWith('/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      if (pathname.startsWith('/dashboard/employer') && role !== 'employer') {
        return NextResponse.redirect(new URL('/dashboard/worker', request.url));
      }

      if (pathname.startsWith('/dashboard/worker') && role !== 'worker') {
        return NextResponse.redirect(new URL('/dashboard/employer', request.url));
      }
    }
  } catch (e) {
    // Fail silently alongside edge execution mapping
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register'
  ]
};
