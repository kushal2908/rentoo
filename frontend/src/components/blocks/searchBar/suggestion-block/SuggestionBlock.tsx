import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
    title: string;
};

export default async function SuggestionBlock({ title }: Props) {
    return (
        <div className="mb-12">
            <h2 className="font-bold text-lg mb-4">{title}</h2>
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full"
            >
                <CarouselContent>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/6">
                            <Link href="#">
                                <div className="rounded-xl bg-gray-200 mb-2 relative">
                                    <Image
                                        src="https://plus.unsplash.com/premium_photo-1661962958462-9e52fda9954d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        height={1000}
                                        width={1000}
                                        alt=""
                                        className="rounded-xl h-full w-full"
                                    />
                                    <div className="flex justify-between">
                                        <Button
                                            variant={'ghost'}
                                            size={'icon'}
                                            className="absolute top-1.5 left-46 md:left-34 text-gray-50 hover:text-gray-900 size-7"
                                        >
                                            <Heart className="size-6" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="text-xs font-bold">Location name</p>
                                    <p className="text-xs text-gray-600">Location name</p>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
