import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer, fadeInUp, EASE_SMOOTH } from '../../utils/animations';
import { THEME_COLORS } from '../../config';

export const SectionWrapper = ({ children, title, subtitle, id }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section id={id} className="min-h-screen flex items-center justify-center py-28 relative z-10" ref={ref}>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="w-full max-w-2xl mx-auto px-4 sm:px-8" style={{ y: yParallax }}>
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 2.5, ease: EASE_SMOOTH } } }} className="text-center mb-16">
                    {subtitle && <span className="block text-xs uppercase tracking-[0.3em] text-white/80 mb-4">{subtitle}</span>}
                    <h2 className="text-5xl sm:text-6xl italic font-serif font-light text-white">{title}</h2>
                    <div className="w-16 h-px bg-white/40 mx-auto mt-8" />
                </motion.div>
                <motion.div variants={fadeInUp}>{children}</motion.div>
            </motion.div>
        </section>
    );
};
