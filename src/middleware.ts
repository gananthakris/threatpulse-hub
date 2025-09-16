import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/utils/amplify-server-config';

// Define public paths that don't require authentication
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

// Define protected path patterns
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
  
  // Allow public paths
  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Check if path needs protection
  const isProtectedPath = PROTECTED_PATTERNS.some(pattern => pathname.startsWith(pattern));
  
  // For root path, check auth status
  const isRootPath = pathname === '/';
  
  if (isProtectedPath || isRootPath) {
    try {
      // Run auth check in Amplify server context
      const authenticated = await runWithAmplifyServerContext({
        nextServerContext: { request, response: NextResponse.next() },
        operation: async (contextSpec) => {
          try {
            const session = await fetchAuthSession(contextSpec);
            // Check if we have valid tokens
            return !!(session?.tokens?.accessToken);
          } catch (error) {
            console.error('Auth session fetch failed:', error);
            return false;
          }
        },
      });
      
      if (!authenticated) {
        // Redirect to sign-in page
        const signInUrl = new URL('/authentication/sign-in', request.url);
        signInUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(signInUrl);
      }
      
      // User is authenticated, continue
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware auth check failed:', error);
      // On error, redirect to sign-in as a safety measure
      const signInUrl = new URL('/authentication/sign-in', request.url);
      signInUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }
  
  // For all other paths, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};