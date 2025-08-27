import HomePageSearch from '@/components/blocks/home-page-search';

export default function Hero() {
    return (
        <div className="bg-gray-100 min-h-[100px] relative flex justify-center items-center py-24 px-4">
            <div className="bg-white w-full md:w-6xl mx-auto p-4 rounded-lg shadow">
                <HomePageSearch />
            </div>
        </div>
    );
}
