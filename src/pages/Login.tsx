import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star, Zap, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoInput } from '@/components/ui/NeoInput';
import { useAuth } from '@/context/AuthContext';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-[#FF6B6B] border-8 border-black rounded-full opacity-10 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFD93D] border-8 border-black rotate-12 opacity-10" />
            <Star className="absolute top-[10%] right-[10%] w-12 h-12 text-[#FFD93D] rotate-12 opacity-20" />
            <Zap className="absolute bottom-[20%] left-[15%] w-16 h-16 text-[#FF6B6B] -rotate-12 opacity-20" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF6B6B] border-4 sm:border-8 border-black flex items-center justify-center shadow-[6px_6px_0px_#000]">
                            <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none">
                                EVENT
                            </h1>
                            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none text-[#FF6B6B]">
                                IFY
                            </h1>
                        </div>
                    </div>
                    <p className="text-lg font-bold uppercase tracking-wide">Welcome back, Organizer!</p>
                </div>

                <NeoCard className="p-6 sm:p-8 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
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
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Lock className="absolute right-4 top-11 w-5 h-5 text-black/40" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-6 h-6 border-4 border-black bg-white group-hover:bg-[#FFD93D] transition-colors relative">
                                    <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer peer" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                                        <ArrowRight className="w-4 h-4 text-black -rotate-45" />
                                    </div>
                                </div>
                                <span className="text-sm font-bold uppercase">Remember me</span>
                            </label>
                            <button type="button" className="text-sm font-bold uppercase hover:underline decoration-4 decoration-[#FF6B6B]">
                                Forgot Password?
                            </button>
                        </div>

                        <NeoButton
                            type="submit"
                            className="w-full h-14 text-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'SIGNING IN...' : (
                                <span className="flex items-center justify-center gap-2">
                                    SIGN IN <ArrowRight className="w-5 h-5" />
                                </span>
                            )}
                        </NeoButton>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t-4 border-black"></div>
                            <span className="flex-shrink mx-4 text-xs font-black uppercase tracking-widest text-black/40 bg-white px-2">OR</span>
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
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#FF6B6B] hover:underline decoration-4">
                            Create one now!
                        </Link>
                    </p>
                </NeoCard>

                {/* Pro Badge */}
                <div className="mt-8 flex justify-center">
                    <div className="bg-[#FFD93D] border-4 border-black px-4 py-2 shadow-[4px_4px_0px_#000] rotate-2 flex items-center gap-2">
                        <Star className="w-4 h-4 fill-black" />
                        <span className="text-sm font-black uppercase tracking-widest">v2.0 Neo-Brutalist</span>
                    </div>
                </div>
            </div>
        </div>
    );
};