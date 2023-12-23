import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const protectedRoutes = ['/', '/ingame'];
const authRoutes = ['/login'];

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('username');
  const isAccessingProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
  const isAccessingAuthdRoute = authRoutes.includes(request.nextUrl.pathname);

  if (isAccessingAuthdRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }

  if (!isAuthenticated && isAccessingProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

  return NextResponse.next();
}
