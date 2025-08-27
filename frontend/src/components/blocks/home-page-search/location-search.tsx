'use client';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent } from '@/components/ui/popover';
import useDebounce from '@/hooks/use-debounce';
import { PUBLIC_API } from '@/lib/axios.config';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { useEffect, useState } from 'react';

type Props = {};

export default function LocationSearch({}: Props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [locationList, setLocationList] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const debouncedSearchTerm = useDebounce(query, 500);

    const fetchLocation = () => {
        PUBLIC_API.get(`/listing/locationSearch?search=${debouncedSearchTerm}`)
            .then((res) => {
                setLocationList(res.data?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchLocation();
        }
    }, [debouncedSearchTerm]);

    // console.log(selectedLocation);

    return (
        <div className="relative max-w-[500px] w-full">
            <Input
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onChange={(e) => setQuery(e.target.value)}
                value={selectedLocation || query}
                placeholder="Search Location"
            />
            {open && (
                <div className=" absolute bg-white w-[420px] md:w-[500px] p-4 mt-1 border border-gray-300 rounded shadow-sm z-10">
                    {locationList.length > 0 ? (
                        locationList.map((location: any) => (
                            <div
                                key={location?.id}
                                role="option"
                                aria-selected={selectedLocation === location.city}
                                tabIndex={0}
                                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                                onClick={() => {
                                    console.log('kkk');
                                    setSelectedLocation(location.city);
                                    setOpen(false);
                                }}
                            >
                                <p className="font-bold">{location?.city}</p>
                                <p>{location?.country}</p>
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">No locations found</div>
                    )}
                </div>
            )}
        </div>
    );
}
