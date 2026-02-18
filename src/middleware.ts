import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = [
  '/authentication/sign-in',
  '/authentication/sign-up',
  '/authentication/forgot-password',
  '/authentication/reset-password',
  '/authentication/confirm-email',
  '/authentication/lock-screen',
  '/authentication/logout',
  '/_next',
  '/favicon.ico',
  '/images',
  '/api/auth'
];

const PROTECTED_PATTERNS = [
  '/dashboard',
  '/admin',
  '/profile',
  '/apps',
  '/projects',
  '/settings'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));
  if (isPublicPath) {
    return NextResponse.next();
  }

  const isProtectedPath = PROTECTED_PATTERNS.some(pattern => pathname.startsWith(pattern));
  const isRootPath = pathname === '/';

  if (isProtectedPath || isRootPath) {
    const session = request.cookies.get('tp_session');
    if (!session?.value) {
      const signInUrl = new URL('/authentication/sign-in', request.url);
      signInUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
