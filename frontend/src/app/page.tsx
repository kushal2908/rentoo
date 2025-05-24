import SuggestionBlock from '@/components/blocks/suggestion-block/SuggestionBlock';
import Hero from '@/components/pages/index/Hero';

export default function Home() {
    return (
        <div>
            <Hero />
            <div className="py-16 appLayout">
                <SuggestionBlock title="Top places" />
                <SuggestionBlock title="Top places in Dhaka" />
            </div>
        </div>
    );
}
