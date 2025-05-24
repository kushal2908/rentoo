'use client';
import { APP_ROUTE } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

type Props = {};

export default function Header({}: Props) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {}, []);
    return (
        <header className="bg-gray-100 shadow-sm">
            <div className="appLayout flex justify-between items-center py-4 gap-4">
                <Link href={APP_ROUTE.INDEX}>
                    <Image src={'/logo.png'} width={100} height={40} alt="rento-logo object-contain" />
                </Link>
                <nav className="flex justify-center items-center gap-4 font-semibold text-gray-600 ">
                    <Link href="/hotels" className="hover:text-gray-900">
                        Hotels
                    </Link>
                    <Link href="/hotels" className="hover:text-gray-900">
                        Places
                    </Link>
                    <Link href="/hotels" className="hover:text-gray-900">
                        Vacation
                    </Link>
                </nav>
                <Button>Signin</Button>
            </div>
        </header>
    );
}
