{
  /* import { NextResponse } from 'next/server';

export function middleware(req) {
  console.log(req.url);

  return NextResponse.redirect(new URL('/about', req.url));
}

*/
}

// auth also works as a middleware
import { auth } from './app/_lib/auth';
export const middleware = auth;

export const config = {
  matcher: ['/account'], // the middleware will only run when this route is requested
};
