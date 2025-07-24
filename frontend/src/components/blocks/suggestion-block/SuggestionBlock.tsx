import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import seed from './seed.json';
type Props = {
    title: string;
};

export default async function SuggestionBlock({ title }: Props) {
    return (
        <div className="mb-12">
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full"
            >
                <div className="flex justify-between">
                    <h2 className="font-bold text-lg mb-4">{title}</h2>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </div>
                <CarouselContent>
                    {seed?.map((d: any) => (
                        <CarouselItem key={d?.code} className="basis-1/2 md:basis-1/4 lg:basis-1/5 ">
                            <Link href="#">
                                <div className="relative bg-gray-200 mb-2 rounded-xl group overflow-hidden">
                                    <Image
                                        src={d?.image}
                                        alt=""
                                        width={300}
                                        height={200}
                                        className="rounded-xl w-full h-36 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-primary/0 opacity-60 rounded-xl"></div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-gray-50 hover:text-gray-900 rounded-full"
                                    >
                                        <Heart className="size-5" />
                                    </Button>
                                    <div className="absolute top-4 left-2 flex items-center gap-1 text-xs font-bold text-white">
                                        <Star className="size-5 fill-yellow-600 text-transparent" /> {d?.starRating}
                                    </div>
                                </div>

                                <div className="hover:text-primary transition-transform duration-300 ease-in-out">
                                    <p className="text-xs font-bold">{d?.name}</p>
                                    <p className="text-xs text-gray-600">{d?.location}</p>
                                    <div className="flex gap-2 mt-1">
                                        <p className="text-xs text-gray-600 font-medium">{d?.pricePerNight}/night</p>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
