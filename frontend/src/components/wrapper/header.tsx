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
        <header className={cn('fixed z-2 w-[100dvw] transition-all duration-300 bg-white shadow-sm py-4')}>
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
    const userData = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center gap-2 focus:outline-none cursor-pointer">
                <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">{userData.firstName + ' ' + userData.lastName}</p>
                    <p className="text-xs font-semibold text-slate-600">{userData.email}</p>
                </div>
                <Avatar>
                    <AvatarImage src={userData?.avatar || 'https://github.com/shadcn.png'} />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link href={APP_ROUTE.PROFILE + `/${userData.userId}`}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={APP_ROUTE.MY_ORDERS + `/${userData.userId}`}>
                    <DropdownMenuItem>My Orders</DropdownMenuItem>
                </Link>
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
