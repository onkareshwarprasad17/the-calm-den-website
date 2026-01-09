// auth middleware
import { auth } from './app/_lib/auth';

export const middleware = auth;

export const config = {
  matcher: ['/account', '/account/:path*'], // run for /account and nested routes
};
