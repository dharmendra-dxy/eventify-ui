import React from 'react';
import { Shield, Eye, Lock, Star, Zap, ChevronLeft, Globe } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Data Collection",
            icon: Eye,
            color: "#FF6B6B",
            content: "We collect only the essential information needed to provide our services, including your name, email address, and event details. We do not sell your personal data to third parties."
        },
        {
            title: "How We Use Data",
            icon: Globe,
            content: "Your data is used to manage your account, facilitate event registrations, and send service-related notifications. We may use anonymized data for platform improvement and analytics."
        },
        {
            title: "Security Measures",
            icon: Lock,
            color: "#FFD93D",
            content: "We implement industry-standard security measures to protect your information from unauthorized access, loss, or alteration. Our servers use encrypted communication (SSL/TLS)."
        },
        {
            title: "Your Rights",
            icon: Shield,
            color: "#C4B5FD",
            content: "You have the right to access, update, or delete your personal information at any time through your account settings. Contact us if you need help managing your data."
        }
    ];

    return (
        <div className="neo-page p-6 lg:p-8 bg-[#FFFDF5] min-h-screen">
            {/* Header */}
            <div className="mb-8 relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                            Privacy Policy
                        </h1>
                        <NeoBadge variant="secondary" rotation={-2}>v1.0</NeoBadge>
                    </div>
                    <p className="text-lg font-medium text-black/60">
                        Your privacy is our top priority.
                    </p>
                </div>
                <NeoButton variant="muted" size="sm" onClick={() => navigate(-1)}>
                    <ChevronLeft className="w-5 h-5 mr-1" /> Back
                </NeoButton>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections.map((section, index) => {
                        const Icon = section.title === "How We Use Data" ? Globe : section.icon;
                        return (
                            <NeoCard key={index} className="bg-white p-6 sm:p-8 flex flex-col gap-4" rotation={index % 2 === 0 ? 0.5 : -0.5}>
                                <div
                                    className="w-14 h-14 border-4 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: section.color || '#C4B5FD' }}
                                >
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-tight">{section.title}</h2>
                                <p className="text-black/80 font-medium leading-relaxed">
                                    {section.content}
                                </p>
                            </NeoCard>
                        );
                    })}
                </div>

                <NeoCard className="bg-[#FFD93D] border-4 border-black p-8 sm:p-10 shadow-[10px_10px_0px_#000] relative overflow-hidden">
                    <Zap className="absolute -bottom-4 -right-4 w-24 h-24 text-black/10 rotate-12" />
                    <h2 className="text-3xl font-black uppercase mb-4 relative z-10">Cookies & Tracking</h2>
                    <p className="text-lg font-bold mb-6 relative z-10">
                        We use functional cookies to keep you logged in and improve your experience. We do not use intrusive tracking or cross-site advertising cookies.
                    </p>
                    <div className="flex flex-wrap gap-4 relative z-10">
                        <div className="px-4 py-2 bg-white border-2 border-black font-bold uppercase text-sm">Session Data</div>
                        <div className="px-4 py-2 bg-white border-2 border-black font-bold uppercase text-sm">Login State</div>
                        <div className="px-4 py-2 bg-white border-2 border-black font-bold uppercase text-sm">Theme Prefs</div>
                    </div>
                </NeoCard>

                <div className="p-6 bg-white border-4 border-black text-center space-y-4">
                    <p className="font-bold uppercase tracking-widest text-black/60">Have questions about your data?</p>
                    <p className="text-xl font-black">privacy@eventify.neo</p>
                    <div className="flex justify-center gap-2">
                        <Star className="w-5 h-5 text-[#FFD93D]" />
                        <Star className="w-5 h-5 text-[#FF6B6B]" />
                        <Star className="w-5 h-5 text-[#C4B5FD]" />
                    </div>
                </div>
            </div>
        </div>
    );
};