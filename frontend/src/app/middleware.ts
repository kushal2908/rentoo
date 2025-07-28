import useAuth from '@/hooks/use-auth';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, res: NextResponse) {
    const { pathname } = req.nextUrl;
}
