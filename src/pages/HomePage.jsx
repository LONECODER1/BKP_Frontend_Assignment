import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);

    const colors = ['#E74C3C', '#FF6B9D', '#9B59B6', '#EEEEEE'];

    useEffect(() => {
        const particleArray = [];
        for (let i = 0; i < 150; i++) {
            particleArray.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 6 + 3,
                delay: Math.random() * 8,
                duration: Math.random() * 3 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        setParticles(particleArray);

        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#222831]">
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full animate-float opacity-30"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            backgroundColor: particle.color,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
                            transition: 'transform 0.3s ease-out',
                            boxShadow: `0 0 5px ${particle.color}30`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
                <div className="text-center mb-20 animate-fade-in-up">
                    <h1 className="text-7xl md:text-8xl font-light mb-8 tracking-wider">
                        {['Basti  ', 'Ki  ', 'Pathshala '].map((letter, i) => (
                            <span
                                key={i}
                                className="inline-block animate-wave-text cursor-pointer transition-all duration-500 hover:scale-110"
                                style={{
                                    color: i % 3 === 0 ? '##FF582E' : i % 3 === 1 ? '#FF582E' : '#EEEEEE',
                                    animationDelay: `${i * 0.1}s`,
                                    textShadow: `0 0 10px ${i % 3 === 0 ? '#E74C3C' : i % 3 === 1 ? '#FF6B9D' : '#EEEEEE'}20`,
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </h1>
                    <div
                        className="w-48 h-1 mx-auto mb-8 rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, transparent, #E74C3C, #FF6B9D, #E74C3C, transparent)',
                            boxShadow: '0 0 10px rgba(231, 76, 60, 0.3)',
                        }}
                    ></div>
                    <p className="text-xl text-[#EEEEEE] opacity-80 max-w-3xl mx-auto leading-relaxed">
                        Welcome to the Basti Ki Pathshala
                        <br />
                        <span className="text-lg opacity-70">Together We Can Change the world</span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                    <button
                        className="group relative overflow-hidden bg-gradient-to-r from-[#E74C3C] to-[#E74C3C]/80 text-[#EEEEEE] px-16 py-5 rounded-full font-semibold text-xl transition-all duration-700 hover:shadow-2xl hover:scale-105 transform animate-pulse border border-[#E74C3C]/30"
                        style={{ boxShadow: '0 0 30px rgba(231, 76, 60, 0.4)' }}
                        onClick={() => navigate('/Admin')}
                    >
                        <span className="relative z-10 flex items-center gap-3">Admin Login<span className="text-sm">✦</span></span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF582E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
                    </button>

                    <button
                        className="group relative overflow-hidden bg-[#222831] border-2 border-[#FF6B9D]/50 text-[#FF6B9D] px-16 py-5 rounded-full font-semibold text-xl transition-all duration-700 hover:bg-[#FF6B9D] hover:text-[#222831] hover:shadow-2xl hover:scale-105 transform animate-pulse"
                        style={{ boxShadow: '0 0 30px rgba(255, 107, 157, 0.3)' }}
                        onClick={() => navigate('/register')}
                    >
                        <span className="relative z-10 flex items-center gap-3">Apply Now<span className="text-sm">✧</span></span>
                        <div className="absolute inset-0 bg-[#FF6B9D] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 rounded-full"></div>
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes wave-text {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-8px) scale(1.05); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(180deg); }
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.2); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1.5s ease-out forwards;
                }
                .animate-wave-text {
                    animation: wave-text 3s ease-in-out infinite;
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                .animate-twinkle {
                    animation: twinkle 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default HomePage;
