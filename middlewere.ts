import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const origin = request.headers.get('origin')

  const response = NextResponse.next()
  response.headers.set("Access-Control-Allow-Origin", "*") // CHANGE THIS LINE TO ONLY ALLOW EARTHSENSOR.COM ACCESS
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  response.headers.set("Access-Control-Max-Age", "86400")

  console.log('Middlewere!');
  console.log(request.method)
  console.log(request.url)

  return response
}

export const config = {
  matcher: '/api/:path*',
}