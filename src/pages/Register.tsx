import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star, Zap, Mail, Lock, User, ArrowRight, Github, ShieldCheck } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';

export const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration
        setTimeout(() => {
            setIsLoading(false);
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-5% ] right-[-5%] w-[30%] h-[30%] bg-[#FFD93D] border-8 border-black rounded-full opacity-10 animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF6B6B] border-8 border-black rotate-12 opacity-10" />
            <Star className="absolute top-[15%] left-[10%] w-12 h-12 text-[#FF6B6B] rotate-12 opacity-20" />
            <Zap className="absolute bottom-[10%] right-[15%] w-16 h-16 text-[#C4B5FD] -rotate-12 opacity-20" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#C4B5FD] border-4 sm:border-8 border-black flex items-center justify-center shadow-[6px_6px_0px_#000]">
                            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none">
                                EVENT
                            </h1>
                            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none text-[#C4B5FD]">
                                IFY
                            </h1>
                        </div>
                    </div>
                    <p className="text-lg font-bold uppercase tracking-wide">Join the Movement!</p>
                </div>

                <NeoCard className="p-6 sm:p-8 bg-white" rotation={-1}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <NeoInput
                                label="Full Name"
                                placeholder="Shivam Gupta"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <User className="absolute right-4 top-11 w-5 h-5 text-black/40" />
                        </div>

                        <div className="relative">
                            <NeoInput
                                label="Email Address"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Mail className="absolute right-4 top-11 w-5 h-5 text-black/40" />
                        </div>

                        <div className="relative">
                            <NeoInput
                                label="Create Password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Lock className="absolute right-4 top-11 w-5 h-5 text-black/40" />
                        </div>

                        <div className="p-4 bg-[#FFFDF5] border-4 border-black text-xs font-bold uppercase space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" required className="w-4 h-4 border-2 border-black rounded-none appearance-none checked:bg-[#FF6B6B]" />
                                I agree to the <Link to="/terms" className="underline hover:text-[#FF6B6B]">Terms of Service</Link>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 border-2 border-black rounded-none appearance-none checked:bg-[#FFD93D]" />
                                Subscribe to our newsletter
                            </label>
                        </div>

                        <NeoButton
                            type="submit"
                            className="w-full h-14 text-lg bg-[#C4B5FD]"
                            disabled={isLoading}
                        >
                            {isLoading ? 'CREATING...' : (
                                <span className="flex items-center justify-center gap-2">
                                    CREATE ACCOUNT <ArrowRight className="w-5 h-5" />
                                </span>
                            )}
                        </NeoButton>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t-4 border-black"></div>
                            <span className="flex-shrink mx-4 text-xs font-black uppercase text-black/40 bg-white px-2">OR REGISTER WITH</span>
                            <div className="flex-grow border-t-4 border-black"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <NeoButton variant="secondary" className="h-12 border-4" type="button">
                                <Github className="w-5 h-5 mr-2" /> GITHUB
                            </NeoButton>
                            <NeoButton variant="secondary" className="h-12 border-4" type="button">
                                <span className="font-black mr-2">G </span> GOOGLE
                            </NeoButton>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm font-bold uppercase">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#C4B5FD] hover:underline decoration-4">
                            Log in instead!
                        </Link>
                    </p>
                </NeoCard>

                {/* Pro Badge */}
                <div className="mt-8 flex justify-center">
                    <div className="bg-[#FF6B6B] text-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_#000] rotate-2 flex items-center gap-2">
                        <Star className="w-4 h-4 fill-white text-white" />
                        <span className="text-sm font-black uppercase tracking-widest text-white">Organizer Pro v2.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};