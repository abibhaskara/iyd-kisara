import React from 'react';
import { META } from './meta';

/**
 * ────────────────────────────────────────────────────────────
 * [ TEMPLATE CONFIGURATION ]
 * ────────────────────────────────────────────────────────────
 */
export const TEMPLATE_CONTENT = {
    // Data Utama
    name: META.name,
    eventType: META.eventType,
    date: META.shortDate,
    dateTimeIso: "20260919T090000/20260919T170000",
    locationName: META.venue,
    locationAddress: "Jl. Gatot Subroto IV No. 6, Dauh Puri Kaja, Denpasar Utara, Kota Denpasar, Bali 80233",
    quote: <>"Ragam Nalar, Sejuta Layar<br />untuk Hak dan Suara"</>,
    musicUrl: "/music/background.mp3",

    // Landing Page
    landing: {
        supTitle: "PUNCAK PERAYAAN",
        specialFor: "KEPADA",
        defaultGuest: "Tamu",
        openButton: "Buka Undangan",
        heroImage: "https://res.cloudinary.com/dnbgczi9b/image/upload/v1789575572/Blue_White_Minimalist_9.9_Super_Sale_Instagram_Story_snsl7v.png"
    },

    // Section: Home
    home: {
        supTitle: "PUNCAK PERAYAAN",
        description: "Mari bersama merayakan semangat, kreativitas, dan keberagaman suara anak muda dalam menyuarakan hak, gagasan, dan perubahan.",
        saveDateLabel: "Simpan Tanggal Ini",
        heroImage: "https://res.cloudinary.com/dnbgczi9b/image/upload/v1789575572/Blue_White_Minimalist_9.9_Super_Sale_Instagram_Story_snsl7v.png"
    },

    // Section: Event
    event: {
        sectionTitle: "Acara",
        sectionSubtitle: "Detail",
        countdownLabel: "Acara Dimulai Dalam",
        timeTitle: "Sabtu, 19 September 2026",
        timeDetail: "09.00 WITA – selesai",
        addToCalendar: "Simpan ke Kalender",
        mapButton: "Lihat Peta",
        mapUrl: "https://maps.app.goo.gl/2doyR7i7ZAPp9VBJA",
        calendarUrl: ""
    },

    // Section: Agenda
    agenda: {
        sectionTitle: "Agenda Acara",
        sectionSubtitle: "Agenda",
        items: [
            {
                title: "🎬 Film Screening & Discussion",
                desc: "Menonton dan berdiskusi bersama tentang karya serta perspektif anak muda."
            },
            {
                title: "🏆 Awarding Session",
                desc: "Pengumuman dan apresiasi bagi para pemenang:\nLomba Debat\nLomba Film Vertikal"
            },
            {
                title: "✨ Celebration & Youth Voices",
                desc: "Merayakan keberanian anak muda untuk berpikir, berkarya, bersuara, dan mengambil ruang."
            }
        ]
    },

    // Section: Dresscode
    attire: {
        sectionTitle: "Panduan Pakaian",
        sectionSubtitle: "Busana",
        description: <>Kami mengundang Anda untuk hadir dengan pakaian<br /><span className="font-serif text-2xl italic text-white">"{META.dressCode}"</span></>
    },

    // Section: Gallery
    gallery: {
        sectionTitle: "Captured Moments",
        sectionSubtitle: "Gallery",
        images: [
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781612982/Untitled-1_hxh93l.webp",
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613022/Untitled-2_lgo20w.webp",
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613081/Untitled-4_wb814c.webp",
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613036/Untitled-3_dvx1p8.webp",
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613156/Untitled-5_udlz8f.webp",
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613164/Untitled-6_ygcotf.webp",
        ]
    },

    // Section: Wishes
    wishes: {
        sectionTitle: "Warm Wishes",
        sectionSubtitle: "From Friends & Family",
        formTitle: "Send your blessings",
        placeholderName: "Your Name",
        placeholderMsg: "Write a warm wish...",
        submitButton: "Send Message"
    },

    // Section: Thank You
    thankYou: {
        title: "Sampai Jumpa!",
        message: <>MARI MERAYAKAN KEKUATAN SUARA ANAK MUDA<br />BERSAMA KISARA BALI.</>
    },

    // Footer
    footer: {
        credit: "Dibuat dengan kreativitas oleh abibhaskara",
        link: "https://abibhaskara.com"
    }
};

// Theme Colors
export const THEME_COLORS = {
    primary: '#ffffff',
    secondary: '#f4f4f4',
    accent: '#D4AF37',
    glass: 'rgba(255, 255, 255, 0.90)',
    glassBorder: 'rgba(0, 0, 0, 0.05)',
};

// Global Styles
export const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        html { scroll-snap-type: y mandatory; }
        body { 
            font-family: 'Montserrat', sans-serif; 
            overflow-x: hidden; 
            scroll-behavior: smooth; 
            cursor: default; 
            -webkit-tap-highlight-color: transparent; 
            touch-action: manipulation; 
            background-image: url('/bg.png');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
        }
        h1, h2, h3, h4, .font-serif { font-family: 'Cormorant Garamond', serif; }
        section { scroll-snap-align: start; }
        ::-webkit-scrollbar { width: 0; background: transparent; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
);
