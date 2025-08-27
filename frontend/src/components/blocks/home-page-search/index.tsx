import { Button } from '@/components/ui/button';
import React from 'react';
import LocationSearch from './location-search';

export default function HomePageSearch() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <LocationSearch />
            <Button>Search</Button>
        </div>
    );
}
