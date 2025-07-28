import SearchBar from '@/components/blocks/searchBar';

type Props = {};

export default function Hero({}: Props) {
    return (
        <div className="bg-gray-100 min-h-[ 00px] relative flex justify-center items-center py-24 px-4">
            <div className="bg-white w-full  md:w-6xl mx-auto p-4 rounded-lg shadow ">
                <SearchBar />
            </div>
        </div>
    );
}
