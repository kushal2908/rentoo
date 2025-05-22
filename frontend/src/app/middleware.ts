import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    console.log(pathname);
}
