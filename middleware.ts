import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Check if we are in development mode
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = atob(authValue).split(':');

        const validUser = process.env.BASIC_AUTH_USER || 'members-only';
        const validPass = process.env.BASIC_AUTH_PASSWORD || 'FF2025!';

        if (user === validUser && pwd === validPass) {
            return NextResponse.next();
        }
    }

    return new NextResponse('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - logo.png (public images)
         * - logo-full.png
         */
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo-full.png).*)',
    ],
};
