import { NextRequest, NextResponse } from 'next/server';

export function middleware(request:NextRequest) {
  const token = request.cookies.get('token')?.value || '';
  const path = request.nextUrl.pathname;


  if (token && (path === '/auth/login' || path === '/auth/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

 
  if (!token && path === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/login', '/auth/signup'], // Sirf yahi paths middleware handle karega
};
