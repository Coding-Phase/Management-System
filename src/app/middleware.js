// middleware.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Define protected routes
const protectedRoutes = [
  '/dashboard', 
  '/profile', 
  '/distributormanagement', 
  '/clientmanagement', 
  '/machinemanagement', 
  '/employeemanagement', 
  '/reports', 
  '/criticalreports'
];

// Middleware function
export function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If the route is not protected, allow the request to proceed
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Retrieve the token from cookies
  const token = req.cookies.get('token')?.value;

  // If no token is found, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    return NextResponse.next();
  } catch (err) {
    // Token verification failed, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Define the matcher to apply middleware only to relevant routes
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/profile/:path*', 
    '/distributormanagement/:path*',
    '/clientmanagement/:path*',
    '/machinemanagement/:path*',
    '/employeemanagement/:path*',
    '/reports/:path*',
    '/criticalreports/:path*'
  ],
};
