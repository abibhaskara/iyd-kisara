import { Heart, Calendar, Shirt, Image as ImageIcon, Mail, List } from 'lucide-react';
import { TEMPLATE_CONTENT } from '../config';

export const NAV_ITEMS = [
    { id: 'home', label: 'Beranda', icon: Heart },
    { id: 'event', label: 'Acara', icon: Calendar },
    { id: 'agenda', label: 'Agenda', icon: List },
    { id: 'dresscode', label: 'Busana', icon: Shirt },
    { id: 'rsvp', label: 'RSVP', icon: Mail },
];
