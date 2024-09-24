import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  const authRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password']
  const isAuthRoute = authRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!session && !isAuthRoute && request.nextUrl.pathname !== '/signup') {
    return NextResponse.redirect(new URL('/signup', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}