import React from 'react';
import Header from './header';
import Footer from './footer';

export default function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Header />
            <div className="pt-18">{children}</div>
            <Footer />
        </main>
    );
}
