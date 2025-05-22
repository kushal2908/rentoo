import { Facebook, Twitter, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

export default function Footer({}: Props) {
    return (
        <div className="bg-gray-100 py-16">
            <div className="appLayout">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-700">
                    {/* Logo & Description */}
                    <div>
                        <Image src="/logo.png" width={140} height={60} alt="Rentoo" className="object-contain mb-4" />
                        <p className="text-gray-600">
                            Rentoo is your go-to platform for booking unique stays and experiences across Bangladesh.
                        </p>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="font-semibold mb-4">Explore</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Top Destinations
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Experiences
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    New Listings
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Weekly Deals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Cancellation Options
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Trust & Safety
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Cookies
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-xs text-gray-600 mt-10 border-t border-gray-300">
                    <div className="mt-2 flex justify-between">
                        <p>© 2025 Rentoo. All rights reserved.</p>
                        <div className="flex space-x-4 mt-4">
                            <Link href="#" aria-label="Facebook">
                                <Facebook className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
                            </Link>
                            <Link href="#" aria-label="Twitter">
                                <Twitter className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
                            </Link>
                            <Link href="#" aria-label="Instagram">
                                <Instagram className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
