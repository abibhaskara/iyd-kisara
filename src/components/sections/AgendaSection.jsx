import React from 'react';
import { TEMPLATE_CONTENT } from '../../config';
import { SectionWrapper } from '../ui/SectionWrapper';

export const AgendaSection = () => {
    const { agenda } = TEMPLATE_CONTENT;

    if (!agenda) return null;

    return (
        <SectionWrapper title={agenda.sectionTitle} subtitle={agenda.sectionSubtitle} id="agenda">
            <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto">
                {agenda.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-start p-6 sm:p-8 border border-white/60 bg-white/80 backdrop-blur-md shadow-sm rounded-sm"
                    >
                        <h3 className="text-xl sm:text-2xl font-serif italic mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};
