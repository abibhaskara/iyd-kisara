import React from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_CONTENT } from '../../config';
import { fadeInUp } from '../../utils/animations';
import { SectionWrapper } from '../ui/SectionWrapper';

export const DresscodeSection = () => {
    const { attire } = TEMPLATE_CONTENT;

    return (
        <SectionWrapper title={attire.sectionTitle} subtitle={attire.sectionSubtitle} id="dresscode">
            <div className="text-center pb-8">
                <motion.p variants={fadeInUp} className="font-light text-gray-600 leading-loose text-lg">{attire.description}</motion.p>
            </div>
        </SectionWrapper>
    );
};
