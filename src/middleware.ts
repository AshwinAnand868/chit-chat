import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname;
        console.log(pathname);

        const isAuth = await getToken({req});
        console.log(isAuth);

        const isLoginPage = pathname.startsWith('/login');
        console.log(isLoginPage);

        const sensitiveRoutes = ['/dashboard'];
        const isAccessingSensitiveRoute = sensitiveRoutes.some((route) => pathname.startsWith(route));

        if(isLoginPage) {
            console.log("Inside if condition");
            if(isAuth) {
                console.log("Redirecting to dashboard");
                console.log("Request object");
                console.log(req);

                return NextResponse.redirect(new URL('/dashboard', req.url));
            }

            return NextResponse.next();
        }

        
        if(!isAuth && isAccessingSensitiveRoute) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
        
        if(pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        // if(isAuth) {
        //     return NextResponse.redirect(new URL('/dashboard', req.url));
        // }
    }, {
        callbacks: {
            async authorized() {
                return true
            }
        }
    }
)

export const config = {
    matcher: ['/', '/login', '/dashboard/:path*'], // /dashboard/:path* means any /dashboard/anyword
}