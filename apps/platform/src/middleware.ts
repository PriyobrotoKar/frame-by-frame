import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from './lib/session';

const protectedRoutes = ['/admin', '/learn'];

export async function middleware(request: NextRequest) {
  console.log('Middleware triggered for:', request.nextUrl.pathname);
  const res = await updateSession(request);

  if (res) {
    return res;
  }

  const session = await getSession(request);
  // check if an unauthenticated user trying to access a protected route
  if (
    !session &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Check if an authenticated user trying to access the admin panel
  if (
    session?.user.role !== 'ADMIN' &&
    request.nextUrl.pathname.startsWith('/admin')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
