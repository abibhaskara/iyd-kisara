import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_CONTENT } from '../../config';
import { EASE_SMOOTH } from '../../utils/animations';

export const LandingEnvelope = ({ onOpen, guestName }) => {
    const { landing, name, eventType } = TEMPLATE_CONTENT;
    const [isHovered, setIsHovered] = useState(false);
    const [isMediaLoaded, setIsMediaLoaded] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-end pb-12 sm:pb-16 overflow-hidden bg-black" exit={{ y: "-100%", transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } }}>
            <motion.div className={`absolute inset-0 z-0 bg-gray-900 ${!isMediaLoaded ? 'animate-pulse' : ''}`} initial={{ opacity: 0.6, scale: 1.3 }} animate={{ opacity: 0.3, scale: 1 }} transition={{ duration: 8, ease: "easeOut" }}>
                <img 
                    src={landing.heroImage} 
                    alt="Landing Background"
                    onLoad={() => setIsMediaLoaded(true)}
                    className={`w-full h-full object-cover grayscale transition-opacity duration-1000 ${isMediaLoaded ? 'opacity-100' : 'opacity-0'}`} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className="absolute top-32 sm:top-40 left-0 right-0 z-10 text-center text-white px-6">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.8, duration: 1 }} className="uppercase tracking-[0.4em] text-xs block mb-6">{landing.supTitle}</motion.span>
                <h1 className="text-4xl sm:text-6xl font-serif italic font-light tracking-wide leading-none mb-4">{name}</h1>
                <span className="font-serif italic text-2xl sm:text-3xl opacity-90">{eventType}</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1.2, ease: EASE_SMOOTH }} className="relative z-10 text-center text-white px-6 w-full max-w-md" style={{ isolation: 'isolate' }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.8 }} className="px-6 sm:px-12 py-5 sm:py-8 rounded-lg border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] bg-white/10">
                    <p className="text-[10px] uppercase tracking-widest opacity-60 mb-4">{landing.specialFor}</p>
                    <h3 className="text-2xl sm:text-3xl font-serif italic text-white">{guestName}</h3>
                </motion.div>

                <motion.button
                    onClick={onOpen}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: isHovered ? 1.05 : [1, 0.95, 1] }}
                    transition={{
                        opacity: { delay: 1.3, duration: 1 },
                        scale: isHovered ? { type: "spring", stiffness: 300, damping: 20 } : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileTap={{ scale: 0.85, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                    className="mt-8 sm:mt-12 group flex flex-col items-center gap-2 mx-auto text-xs uppercase tracking-[0.25em] text-white hover:text-gray-200 transition-colors cursor-pointer"
                >
                    <span>{landing.openButton}</span>
                    <div className="w-10 h-px bg-white group-hover:w-20 transition-all duration-500" />
                </motion.button>
            </motion.div>
        </motion.div>
    );
};
