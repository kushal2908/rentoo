import { APP_ROUTE } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import SearchBar from '../blocks/searchBar';

type Props = {};

export default function Header({}: Props) {
    return (
        <header className="bg-gray-100 shadow-sm">
            <div className="appLayout flex justify-between items-center py-4 gap-4">
                <Link href={APP_ROUTE.INDEX}>
                    <Image src={'/logo.png'} width={100} height={40} alt="rento-logo object-contain" />
                </Link>
                {/* <SearchBar /> */}
                <Button>Signin</Button>
            </div>
        </header>
    );
}
