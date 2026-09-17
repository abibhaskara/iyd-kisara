import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TEMPLATE_CONTENT, GlobalStyles } from './config';
import { NAV_ITEMS } from './utils/constants';

// UI Components
import { LazySection } from './components/ui/LazySection';
import { LandingEnvelope } from './components/ui/LandingEnvelope';
import { Navbar } from './components/ui/Navbar';
import { 
    SparkleCursor, 
    BackgroundAudio, 
    ScrollProgress, 
    FloatingDecorations 
} from './components/ui/FloatingElements';

// Section Components
import { HomeSection } from './components/sections/HomeSection';
import { EventSection } from './components/sections/EventSection';
import { AgendaSection } from './components/sections/AgendaSection';
import { DresscodeSection } from './components/sections/AttireSection';
import { RSVPSection } from './components/sections/RSVPSection';
import { ThankYouSection } from './components/sections/ThankYouSection';

// Layout Components
import { Footer } from './components/layout/Footer';
import { AdminPage } from './components/admin/AdminPage';

export default function App() {
    const [isAdmin, setIsAdmin] = useState(() => {
        return window.location.pathname.startsWith('/admin') || 
               new URLSearchParams(window.location.search).has('admin') || 
               window.location.hash === '#admin';
    });
    const [hasEntered, setHasEntered] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isPlaying, setIsPlaying] = useState(false);
    const [navbarVisible, setNavbarVisible] = useState(false);

    const [guestName] = useState(() => {
        const name = new URLSearchParams(window.location.search).get('to');
        return name ? decodeURIComponent(name) : TEMPLATE_CONTENT.landing.defaultGuest;
    });

    useEffect(() => {
        const handleLocationChange = () => {
            setIsAdmin(
                window.location.pathname.startsWith('/admin') || 
                new URLSearchParams(window.location.search).has('admin') || 
                window.location.hash === '#admin'
            );
        };
        window.addEventListener('popstate', handleLocationChange);
        window.addEventListener('hashchange', handleLocationChange);
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            window.removeEventListener('hashchange', handleLocationChange);
        };
    }, []);

    useEffect(() => {
        if (!hasEntered) return;

        const handleScroll = () => {
            setNavbarVisible(window.scrollY > 200);
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            for (const item of NAV_ITEMS) {
                const el = document.getElementById(item.id);
                if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetHeight + el.offsetTop) {
                    setActiveSection(item.id);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasEntered]);

    const handleOpen = () => { setHasEntered(true); setIsPlaying(true); };

    if (isAdmin) {
        return (
            <AdminPage 
                onBack={() => {
                    window.history.pushState({}, '', '/');
                    setIsAdmin(false);
                }} 
            />
        );
    }

    return (
        <div className="min-h-screen w-full relative overflow-hidden text-gray-900 selection:bg-gray-200">
            <GlobalStyles />
            {/* Fixed Background Image */}
            <div 
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none" 
                style={{ backgroundImage: `url('/bg.png')` }} 
            />
            <SparkleCursor />
            <BackgroundAudio isPlaying={isPlaying} />
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[40]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            <AnimatePresence mode='wait'>
                {!hasEntered && <LandingEnvelope key="envelope" onOpen={handleOpen} guestName={guestName} />}
            </AnimatePresence>

            <main className="relative z-10 w-full">
                <HomeSection hasEntered={hasEntered} />
                <LazySection minHeight="100vh">
                    <EventSection />
                </LazySection>
                <LazySection minHeight="100vh">
                    <AgendaSection />
                </LazySection>
                <LazySection minHeight="100vh">
                    <DresscodeSection />
                </LazySection>
                <LazySection minHeight="100vh">
                    <RSVPSection />
                </LazySection>
                <LazySection minHeight="100vh">
                    <ThankYouSection />
                </LazySection>
                <Footer />
            </main>

            {hasEntered && (
                <>
                    <ScrollProgress isVisible={navbarVisible} />
                    <FloatingDecorations isVisible={navbarVisible} />
                    <Navbar activeSection={activeSection} isVisible={navbarVisible} />
                </>
            )}
        </div>
    );
}
