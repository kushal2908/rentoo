import SearchBar from '@/components/blocks/searchBar';

type Props = {};

export default function Hero({}: Props) {
    return (
        <div className="bg-gray-100 py-16 px-4">
            <div className="max-w-[800px]  mx-auto">
                <SearchBar />
            </div>
        </div>
    );
}
