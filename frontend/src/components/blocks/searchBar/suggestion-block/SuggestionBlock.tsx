import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';

type Props = {
    title: string;
};

export default async function SuggestionBlock({ title }: Props) {
    return (
        <div>
            <h2 className="font-bold text-lg mb-4">{title}</h2>
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full"
            >
                <CarouselContent>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/7">
                            <div className="h-24 rounded-xl bg-gray-200 mb-2"></div>
                            <div className="">
                                <p className="text-xs font-bold">Location name</p>
                                <p className="text-xs text-gray-600">Location name</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
