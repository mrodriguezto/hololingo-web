export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/home/:path*', '/profile/:path*', '/users/:path*', '/lessons/:path*'],
};
