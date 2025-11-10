import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes are protected
const protectedRoutes = ['/dashboard', '/dashboard/profile', '/dashboard/settings'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the auth token from cookies (in a real app, you'd use cookies instead of localStorage)
  // For this implementation, we'll check the localStorage via client-side code
  // Middleware runs on the server, so we can't access localStorage directly
  
  // For demonstration purposes, we'll allow the request to proceed
  // The actual authentication check will happen client-side
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
