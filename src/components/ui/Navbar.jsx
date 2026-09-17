import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { THEME_COLORS } from '../../config';
import { NAV_ITEMS } from '../../utils/constants';

export const Navbar = ({ activeSection, isVisible }) => {
    const [hoveredPath, setHoveredPath] = useState(null);
    const hoveredIdx = hoveredPath ? NAV_ITEMS.findIndex(i => i.id === hoveredPath) : -1;

    const getHoverOffset = (itemIdx) => {
        if (hoveredIdx === -1) return 0;
        return itemIdx < hoveredIdx ? -5 : itemIdx > hoveredIdx ? 5 : 0;
    };

    return (
        <div className="fixed bottom-6 sm:bottom-10 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-1 p-1 rounded-full shadow-2xl backdrop-blur-xl max-w-[90vw] sm:max-w-[95vw] overflow-x-auto no-scrollbar"
                style={{ backgroundColor: THEME_COLORS.glass, border: `1px solid ${THEME_COLORS.glassBorder}`, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)", pointerEvents: isVisible ? 'auto' : 'none' }}
                onMouseLeave={() => setHoveredPath(null)}
            >
                <LayoutGroup>
                    {NAV_ITEMS.map((item, itemIdx) => {
                        const isActive = activeSection === item.id;
                        return (
                            <button key={item.id} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })} onMouseEnter={() => setHoveredPath(item.id)} className="relative cursor-pointer focus:outline-none flex-shrink-0">
                                <motion.div layout className="relative z-10 flex items-center justify-center px-3 py-2 rounded-full overflow-hidden" animate={{ x: getHoverOffset(itemIdx), scale: hoveredPath === item.id ? 1.05 : 1 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
                                    <item.icon size={18} strokeWidth={1.5} color={isActive ? '#000000' : '#666666'} className="relative z-20" />
                                    <motion.span initial={false} animate={{ width: isActive ? "auto" : 0, opacity: isActive ? 1 : 0, marginLeft: isActive ? 10 : 0 }} className="whitespace-nowrap font-medium tracking-wide text-xs uppercase relative z-20 overflow-hidden text-black" style={{ color: '#000000' }}>{item.label}</motion.span>
                                    {isActive && <motion.div layoutId="activePill" className="absolute inset-0 rounded-full z-0" style={{ backgroundColor: '#e5e7eb' }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                                </motion.div>
                            </button>
                        );
                    })}
                </LayoutGroup>
            </motion.nav>
        </div>
    );
};
