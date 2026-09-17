import React from 'react';
import { motion } from 'framer-motion';
import { elegantFadeIn } from '../../utils/animations';

export const EventCard = ({ icon: Icon, title, desc, actionText, actionIcon: ActionIcon, href, onAction }) => (
    <motion.div variants={elegantFadeIn} whileHover={{ y: -5, transition: { duration: 0.4, ease: "easeOut" } }} className="flex flex-col items-center text-center p-10 border border-white/60 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-lg transition-shadow duration-500 rounded-sm">
        <Icon size={24} strokeWidth={1} className="mb-6 text-gray-400" />
        <h3 className="font-serif text-2xl mb-3">{title}</h3>
        <p className="font-light text-sm text-gray-500 uppercase tracking-wider mb-8 max-w-xs mx-auto">{desc}</p>
        {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-black hover:text-white transition-all duration-300 text-[10px] uppercase tracking-widest border border-gray-200"><ActionIcon size={14} /><span>{actionText}</span></a>
        ) : (
            <button className="px-8 py-3 border border-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300" onClick={onAction}>{actionText}</button>
        )}
    </motion.div>
);
