import React from 'react';
import { TEMPLATE_CONTENT } from '../../config';

export const Footer = () => (
    <footer className="py-10 bg-white border-t border-gray-50 text-center relative z-10 pb-32">
        <a
            href={TEMPLATE_CONTENT.footer.link || "https://abibhaskara.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.25em] text-gray-400 hover:text-black font-light transition-colors duration-300 inline-block"
        >
            {TEMPLATE_CONTENT.footer.credit}
        </a>
    </footer>
);
