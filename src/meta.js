/**
 * ────────────────────────────────────────────────────────────
 * [ META & SEO CONFIGURATION ]
 * ────────────────────────────────────────────────────────────
 */

export const META = {
    name: 'INTERNATIONAL YOUTH DAY',
    eventType: 'KISARA PKBI BALI 2026',
    date: 'Sabtu, 19 September 2026',
    shortDate: '19 . 09 . 2026',
    venue: 'Aula Lantai 3 PKBI Daerah Bali',
    dressCode: 'Bebas, Rapi & Nyaman',
    heroImage: 'https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613036/Untitled-3_dvx1p8.webp',
    siteUrl: '', // URL Produksi untuk mengisi og:url
};

// Properti Open Graph
export const OG = {
    title: `You're Invited — ${META.name}'s ${META.eventType}`,
    description: `Join us to celebrate ${META.name}'s ${META.eventType} · ${META.date} · ${META.venue} · Dress Code: ${META.dressCode}`,
    siteName: META.eventType,
    image: META.heroImage,
    imageAlt: `${META.name} — ${META.eventType}`,
    imageWidth: '1200',
    imageHeight: '630',
};
