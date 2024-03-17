import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_COOKIE } from './utils/constants';

const protectedRoutes = ['/dashboard'];
export const authRoutes = ['/'];

export function middleware(request: NextRequest) {
  // const isAuth = request.cookies.get(TOKEN_COOKIE);

  // if (!isAuth && protectedRoutes.includes(request.nextUrl.pathname)) {
  //   const absoluteUrl = new URL('/', request.nextUrl.origin);

  //   return NextResponse.redirect(absoluteUrl.toString());
  // }

  const currentUser = request.cookies.get(TOKEN_COOKIE)?.value;
  const currentPath = request.nextUrl.pathname;

  if (protectedRoutes.includes(currentPath) && !currentUser) {
    request.cookies.delete(TOKEN_COOKIE);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authRoutes.includes(currentPath) && currentUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
