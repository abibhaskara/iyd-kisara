import React from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_CONTENT } from '../../config';
import { staggerContainer, fadeInUp } from '../../utils/animations';

export const ThankYouSection = () => {
    const { thankYou, name } = TEMPLATE_CONTENT;
    return (
        <motion.section className="py-32 text-center px-8 relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="max-w-xl mx-auto space-y-12">
                <motion.div variants={fadeInUp} className="w-px h-24 bg-white/40 mx-auto" />
                <motion.h2 variants={fadeInUp} className="text-5xl font-serif italic text-white">{thankYou.title}</motion.h2>
                <motion.p variants={fadeInUp} className="font-light text-white/90 leading-loose text-lg">{thankYou.message}</motion.p>
                <motion.div variants={fadeInUp} className="pt-10 font-serif italic text-3xl text-white">{name}</motion.div>
            </div>
        </motion.section>
    );
};
