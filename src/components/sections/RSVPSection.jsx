import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { TEMPLATE_CONTENT } from '../../config';
import { fadeInUp, elegantFadeIn } from '../../utils/animations';
import { SectionWrapper } from '../ui/SectionWrapper';

const API_URL = import.meta.env.VITE_API_URL || '';

export const RSVPSection = () => {
    const { rsvp: rsvpConfig } = TEMPLATE_CONTENT;

    const [form, setForm] = useState({
        email: '',
        representativeName: '',
        organizationName: '',
        attendeeCount: '',
        whatsapp: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setSubmitError(null);

        const payload = {
            email: form.email.trim(),
            representativeName: form.representativeName.trim(),
            organizationName: form.organizationName.trim(),
            attendeeCount: form.attendeeCount.trim(),
            whatsapp: form.whatsapp.trim(),
        };

        try {
            const res = await fetch(`${API_URL}/api/rsvp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Gagal menyimpan data');

            setIsSubmitted(true);
        } catch (err) {
            console.error('RSVP Submit Error:', err);
            // Simpan ke localStorage sebagai cadangan jika offline / server belum aktif
            const existing = JSON.parse(localStorage.getItem('saved_rsvps') || '[]');
            existing.unshift({ ...payload, submitted_at: new Date().toISOString() });
            localStorage.setItem('saved_rsvps', JSON.stringify(existing));
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setForm({
            email: '',
            representativeName: '',
            organizationName: '',
            attendeeCount: '',
            whatsapp: '',
        });
        setIsSubmitted(false);
        setSubmitError(null);
    };

    return (
        <SectionWrapper title={rsvpConfig.sectionTitle} subtitle={rsvpConfig.sectionSubtitle} id="rsvp">
            <motion.div variants={fadeInUp} className="w-full max-w-2xl mx-auto">
                <div className="p-8 sm:p-12 border border-white/60 bg-white/80 backdrop-blur-md shadow-sm rounded-sm text-gray-900">
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="form"
                                variants={elegantFadeIn}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.98 }}
                                onSubmit={handleSubmit}
                                className="space-y-6 text-left"
                            >
                                <div className="text-center pb-4 border-b border-gray-200/60">
                                    <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                                        {rsvpConfig.description}
                                    </p>
                                </div>

                                {/* Field 1: Email */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="nama@email.com"
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 focus:border-black focus:bg-white outline-none rounded-sm text-sm text-gray-800 placeholder-gray-400 transition-all font-light"
                                    />
                                </div>

                                {/* Field 2: Nama Perwakilan */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium leading-relaxed">
                                        Nama Perwakilan Komunitas/Instansi yang Akan Menghadiri Kegiatan <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-[11px] text-gray-500 font-light italic">Contoh: Tuliskan nama lengkap perwakilan</p>
                                    <input
                                        type="text"
                                        name="representativeName"
                                        required
                                        value={form.representativeName}
                                        onChange={handleChange}
                                        placeholder="Tuliskan nama lengkap perwakilan"
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 focus:border-black focus:bg-white outline-none rounded-sm text-sm text-gray-800 placeholder-gray-400 transition-all font-light"
                                    />
                                </div>

                                {/* Field 3: Nama Komunitas/Instansi */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium">
                                        Nama Komunitas/Instansi <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="organizationName"
                                        required
                                        value={form.organizationName}
                                        onChange={handleChange}
                                        placeholder="Nama Komunitas atau Instansi"
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 focus:border-black focus:bg-white outline-none rounded-sm text-sm text-gray-800 placeholder-gray-400 transition-all font-light"
                                    />
                                </div>

                                {/* Field 4: Jumlah Perwakilan */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium">
                                        Jumlah Perwakilan yang Hadir <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-[11px] text-gray-500 font-light italic">Contoh: 1 orang</p>
                                    <input
                                        type="text"
                                        name="attendeeCount"
                                        required
                                        value={form.attendeeCount}
                                        onChange={handleChange}
                                        placeholder="Contoh: 1 orang"
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 focus:border-black focus:bg-white outline-none rounded-sm text-sm text-gray-800 placeholder-gray-400 transition-all font-light"
                                    />
                                </div>

                                {/* Field 5: Kontak WhatsApp */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs uppercase tracking-wider text-gray-700 font-medium">
                                        Kontak WhatsApp Anggota Komunitas yang Mewakili <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="whatsapp"
                                        required
                                        value={form.whatsapp}
                                        onChange={handleChange}
                                        placeholder="Contoh: 081234567890"
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 focus:border-black focus:bg-white outline-none rounded-sm text-sm text-gray-800 placeholder-gray-400 transition-all font-light"
                                    />
                                </div>

                                {submitError && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center text-xs text-red-500 tracking-wide font-medium"
                                    >
                                        {submitError}
                                    </motion.p>
                                )}

                                <div className="pt-4 text-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto px-10 py-4 bg-black text-white text-[10px] uppercase tracking-[0.25em] font-normal hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 mx-auto rounded-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                                    >
                                        <span>{isSubmitting ? rsvpConfig.submittingButton : rsvpConfig.submitButton}</span>
                                        <Send size={14} />
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center py-6 px-2 space-y-6"
                            >
                                <div className="w-14 h-14 bg-gray-50 text-gray-900 rounded-full flex items-center justify-center mx-auto border border-gray-200">
                                    <CheckCircle2 size={30} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-serif italic text-3xl sm:text-4xl text-gray-900 font-light">{rsvpConfig.successTitle}</h3>
                                    <p className="text-sm text-gray-600 font-light max-w-md mx-auto leading-relaxed">
                                        {rsvpConfig.successMessage}
                                    </p>
                                </div>

                                <div className="p-6 bg-white/60 rounded-sm border border-gray-200/70 text-left text-xs space-y-3 max-w-md mx-auto">
                                    <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                        <span className="text-gray-400 uppercase tracking-wider text-[10px]">Nama Perwakilan</span>
                                        <span className="font-medium text-gray-800 text-right">{form.representativeName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                        <span className="text-gray-400 uppercase tracking-wider text-[10px]">Komunitas / Instansi</span>
                                        <span className="font-medium text-gray-800 text-right">{form.organizationName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                        <span className="text-gray-400 uppercase tracking-wider text-[10px]">Jumlah Hadir</span>
                                        <span className="font-medium text-gray-800 text-right">{form.attendeeCount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 uppercase tracking-wider text-[10px]">WhatsApp</span>
                                        <span className="font-medium text-gray-800 text-right">{form.whatsapp}</span>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="inline-flex items-center gap-2 px-6 py-3 border border-black text-[10px] uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300 rounded-sm"
                                    >
                                        <RefreshCw size={12} />
                                        <span>{rsvpConfig.submitAnother}</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </SectionWrapper>
    );
};
