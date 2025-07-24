'use client';
import { APP_ROUTE } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { getCookie } from 'cookies-next/client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut } from 'lucide-react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const cookie = getCookie('accessToken');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header className={cn('fixed z-10 w-[100dvw] transition-all duration-300 bg-white shadow-sm ', scrolled ? 'py-2 ' : 'py-4')}>
            <div className={cn('appLayout flex justify-between items-center gap-4')}>
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
                {!cookie ? (
                    <Link href={APP_ROUTE.SIGNIN}>
                        <Button>Signin</Button>
                    </Link>
                ) : (
                    <UserDropDownMenu />
                )}
            </div>
        </header>
    );
}

const UserDropDownMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center gap-2 focus:outline-none cursor-pointer">
                <p className="text-sm font-semibold">Username</p>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="text-destructive" />
                    <p className="text-destructive font-semibold">Logout</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
