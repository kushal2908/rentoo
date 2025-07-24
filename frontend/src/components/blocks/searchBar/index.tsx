'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarIcon, Check, Search } from 'lucide-react';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
type Props = {};

export default function SearchBar({}: Props) {
    return (
        <div className=" rounded-full">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-1">
                <LocationSearch />
                <DateRangePicker />
                <Button size={'searchBar'}>Search</Button>
            </form>
        </div>
    );
}

const LocationSearch = () => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const frameworks = [
        {
            value: 'next.js',
            label: 'Next.js',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
        {
            value: 'nuxt.js',
            label: 'Nuxt.js',
        },
        {
            value: 'remix',
            label: 'Remix',
        },
        {
            value: 'astro',
            label: 'Astro',
        },
    ];

    const container = {
        hidden: { opacity: 0, height: 0 },
        show: {
            opacity: 1,
            height: 'auto',
            transition: {
                height: {
                    duration: 0.4,
                },
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                height: {
                    duration: 0.3,
                },
                opacity: {
                    duration: 0.2,
                },
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: -10 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.1,
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'ghost'}
                    role="combobox"
                    size={'searchBar'}
                    aria-expanded={open}
                    className={cn(
                        'bg-white justify-between w-full shadow-none text-gray-800 font-medium border  border-gray-200',
                        !selectedValue && 'text-muted-foreground'
                    )}
                >
                    {selectedValue ? frameworks.find((framework) => framework.value === selectedValue)?.label : 'Search Location...'}
                    <Search className="text-gray-400" />
                </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={6} className="w-[720px] md:w-[260px] p-0 border-gray-300">
                <Command>
                    <CommandInput placeholder="Search Location..." />
                    <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                            <AnimatePresence mode="popLayout"></AnimatePresence>
                            <motion.div variants={container} initial="hidden" animate="show" exit="exit">
                                {frameworks.map((framework) => (
                                    <motion.div key={framework.value} variants={item} layout>
                                        <CommandItem
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setSelectedValue(currentValue === selectedValue ? '' : currentValue);
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    selectedValue === framework.value ? 'opacity-100' : 'opacity-0'
                                                )}
                                            />
                                            <div className="flex justify-between items-center gap-2">
                                                {/* <div>{icon}</div> */}
                                                <div>
                                                    <p className="font-bold">{framework.label}</p>
                                                    {/* <p className="font-medium text-gray-500 text-xs">{address}</p> */}
                                                    <p className="font-medium text-gray-500 text-xs">Dhaka, Bangladesh</p>
                                                </div>
                                            </div>
                                        </CommandItem>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const DateRangePicker = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={'ghost'}
                    className={cn(
                        'justify-between w-full shadow-none text-gray-800 font-medium border bg-white border-gray-200',
                        !date && 'text-muted-foreground'
                    )}
                    size={'searchBar'}
                >
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                            </>
                        ) : (
                            format(date.from, 'LLL dd, y')
                        )
                    ) : (
                        <span>Pick a date</span>
                    )}
                    <CalendarIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full md:w-auto p-0 border-gray-200 rounded-xl" align="start">
                <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
            </PopoverContent>
        </Popover>
    );
};
