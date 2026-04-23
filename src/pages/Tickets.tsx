import React from 'react';
import { ShieldCheck, FileText, Star, ChevronLeft } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { useNavigate } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using Eventify, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of Eventify constitutes acceptance of such modifications."
        },
        {
            title: "2. User Accounts",
            content: "To access certain features of Eventify, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
        },
        {
            title: "3. Use of Services",
            content: "You agree to use Eventify only for lawful purposes and in accordance with these Terms. You are prohibited from using the services in any way that could damage, disable, overburden, or impair our servers or networks, or interfere with any other party's use and enjoyment of the services."
        },
        {
            title: "4. Intellectual Property",
            content: "All content, features, and functionality on Eventify, including but not limited to text, graphics, logos, and software, are the exclusive property of Eventify and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws."
        },
        {
            title: "5. Termination",
            content: "We reserve the right to terminate or suspend your access to Eventify, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service. All provisions of the Terms which by their nature should survive termination shall survive termination."
        }
    ];

    return (
        <div className="neo-page p-6 lg:p-8 bg-[#FFFDF5] min-h-screen">
            {/* Header */}
            <div className="mb-8 relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                            Terms of Service
                        </h1>
                    </div>
                    <p className="text-lg font-medium text-black/60">
                        Last updated: March 15, 2026
                    </p>
                </div>
                <NeoButton variant="muted" size="sm" onClick={() => navigate(-1)}>
                    <ChevronLeft className="w-5 h-5 mr-1" /> Back
                </NeoButton>
                <Star className="absolute -top-4 -right-2 w-8 h-8 text-[#FFD93D] rotate-12 hidden lg:block" />
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                <NeoCard className="bg-[#C4B5FD] p-1 shadow-[8px_8px_0px_#000]">
                    <div className="bg-white border-4 border-black p-6 sm:p-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-[#FF6B6B] border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_#000]">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black uppercase leading-none">Agreement</h2>
                                <p className="font-bold text-black/60 uppercase text-xs mt-1">Please read carefully</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {sections.map((section, index) => (
                                <div key={index} className="space-y-3">
                                    <h3 className="text-xl font-black uppercase inline-block bg-[#FFD93D] px-3 py-1 border-2 border-black rotate-[-1deg]">
                                        {section.title}
                                    </h3>
                                    <p className="text-black/80 leading-relaxed font-medium">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-[#FFFDF5] border-4 border-black shadow-[6px_6px_0px_#000] rotate-1">
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="w-8 h-8 text-[#FF6B6B] flex-shrink-0" />
                                <div>
                                    <h4 className="font-black uppercase mb-1">Our Commitment</h4>
                                    <p className="text-sm font-medium">
                                        At Eventify, we are dedicated to providing a fair and transparent platform for all event organizers and attendees.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </NeoCard>

                {/* Footer actions */}
                <div className="flex justify-center pt-8">
                    <NeoButton onClick={() => navigate('/register')}>
                        I Understand, Sign Me Up!
                    </NeoButton>
                </div>
            </div>
        </div>
    );
};