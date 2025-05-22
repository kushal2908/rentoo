import SuggestionBlock from '@/components/blocks/searchBar/suggestion-block/SuggestionBlock';
import Hero from '@/components/pages/index/Hero';

export default function Home() {
    return (
        <div>
            <Hero />
            <div className="py-16 appLayout">
                <SuggestionBlock title="Stay near Eden Gardens" />
            </div>
        </div>
    );
}
