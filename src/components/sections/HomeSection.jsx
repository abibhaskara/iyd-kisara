import React, { useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TEMPLATE_CONTENT } from '../../config';
import { EASE_SMOOTH } from '../../utils/animations';

export const HomeSection = ({ hasEntered }) => {
    const [isMediaLoaded, setIsMediaLoaded] = useState(false);
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 500], [0, 200]);
    const backgroundScale = useTransform(scrollY, [0, 500], [1, 1.1]);
    const fadeOverlayHeight = useTransform(scrollY, [0, 400, 800], ['0%', '0%', '100%']);
    const textY = useTransform(scrollY, [0, 300], [0, 100]);
    const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const { name, eventType, quote, date, home } = TEMPLATE_CONTENT;

    return (
        <section id="home" className="relative h-screen w-full overflow-hidden flex items-start justify-center pt-32 sm:pt-40">
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: backgroundY }}
                initial={{ scale: 1.5 }}
                animate={hasEntered ? { scale: 1 } : { scale: 1.5 }}
                transition={{ duration: 5, ease: EASE_SMOOTH }}
            >
                <motion.div className={`w-full h-full bg-gray-200 ${!isMediaLoaded ? 'animate-pulse' : ''}`} style={{ scale: backgroundScale }}>
                    <img 
                        src={home.heroImage} 
                        alt="Home Background"
                        onLoad={() => setIsMediaLoaded(true)}
                        className={`w-full h-full object-cover transition-opacity duration-1000 ${isMediaLoaded ? 'opacity-100' : 'opacity-0'}`} 
                    />
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                </motion.div>
            </motion.div>

            {/* White fade overlay from bottom */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
                style={{
                    height: fadeOverlayHeight,
                    background: 'linear-gradient(to top, white 0%, white 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 70%, rgba(255,255,255,0.1) 85%, transparent 100%)'
                }}
            />

            <motion.div className="relative z-10 text-center text-white px-6 w-full max-w-4xl mx-auto" style={{ y: textY, opacity: textOpacity }}>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={hasEntered ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.5, duration: 0.8 }} className="block text-sm uppercase tracking-[0.4em] mb-6 drop-shadow-md">{home.supTitle}</motion.span>
                <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={hasEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} transition={{ delay: 0.7, duration: 1, ease: "easeOut" }} className="text-4xl xs:text-5xl sm:text-6xl italic font-serif font-light mb-4 sm:mb-6 drop-shadow-lg">{name}</motion.h1>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={hasEntered ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.8, duration: 0.8 }} className="font-serif italic text-2xl sm:text-3xl opacity-90 block mb-6">{eventType}</motion.span>
                <motion.div initial={{ scaleY: 0 }} animate={hasEntered ? { scaleY: 1 } : { scaleY: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="w-px h-20 bg-white/50 mx-auto my-10" />
                <motion.p initial={{ opacity: 0 }} animate={hasEntered ? { opacity: 0.9 } : { opacity: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="font-serif text-xl xs:text-2xl sm:text-4xl italic leading-relaxed max-w-2xl mx-auto drop-shadow-md">{quote}</motion.p>
                {home.description && (
                    <motion.p initial={{ opacity: 0 }} animate={hasEntered ? { opacity: 0.9 } : { opacity: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-8 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto opacity-80">{home.description}</motion.p>
                )}
                <motion.div initial={{ opacity: 0 }} animate={hasEntered ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.3, duration: 0.8 }} className="mt-16 flex flex-col items-center gap-3">
                    <span className="uppercase tracking-[0.3em] text-xs opacity-80">{home.saveDateLabel}</span>
                    <span className="text-4xl sm:text-5xl font-serif">{date}</span>
                </motion.div>
            </motion.div>

            <motion.div className="absolute bottom-32 left-0 right-0 z-10 flex justify-center" style={{ opacity: textOpacity }} animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <span className="text-[10px] uppercase tracking-widest text-white/70 text-center">{home.scrollLabel}</span>
            </motion.div>

            <div className="absolute bottom-[-1px] left-0 right-0 z-20 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-[calc(100%+1.3px)] h-[80px] sm:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 Q600,110 1200,60 V120 H0 Z" className="fill-white" />
                </svg>
            </div>
        </section>
    );
};
