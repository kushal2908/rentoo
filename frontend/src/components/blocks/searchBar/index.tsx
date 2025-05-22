'use client';
import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addDays, format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { AnimatePresence, motion } from 'framer-motion';
import { DateRange } from 'react-day-picker';
type Props = {};

export default function SearchBar({}: Props) {
    return (
        <div className="md:border md:border-gray-200 rounded-lg p-[2px]">
            <form className="flex flex-col md:flex-row gap-4">
                <LocationSearch />
                <DateRangePicker />
                <Button>Search</Button>
            </form>
        </div>
    );
}

const LocationSearch = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
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
                duration: 0.3,
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
                    aria-expanded={open}
                    className={cn(
                        'justify-between w-[250px] shadow-none text-gray-800 hover:bg-none font-medium border md:border-none border-gray-200',
                        !value && 'text-muted-foreground'
                    )}
                >
                    {value ? frameworks.find((framework) => framework.value === value)?.label : 'Search Location...'}
                    <Search className="text-gray-400" />
                </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={6} className="w-[250px] p-0 border-gray-200 rounded-xl">
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
                                                setValue(currentValue === value ? '' : currentValue);
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')}
                                            />
                                            {framework.label}
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
                        'justify-between w-[250px] shadow-none text-gray-800 hover:bg-none font-medium border border-gray-200 md:border-none',
                        !date && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon />
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
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-gray-200 rounded-xl" align="start">
                <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
            </PopoverContent>
        </Popover>
    );
};
