import React from 'react';
import GithubImage from '../../assets/Github.png';
import LinkedinImage from '../../assets/Linkedin.png';
import LeetcodeImage from '../../assets/Leetcode.png';

function ProfileCard({name, image, role, description, Linkedin, Github, Leetcode, reverse}) {
  return (
    <div className={`flex flex-col md:flex-row gap-16 items-center w-full group/card transition-all duration-1000 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        
        {/* ENHANCED NEON TEXT BLOCK */}
        <div className={`flex-1 space-y-8 p-12 border-2 border-emerald-500/10 bg-black/40 backdrop-blur-3xl rounded-[3rem] shadow-[0_0_80px_-20px_rgba(16,185,129,0.1)] transition-all duration-500 hover:border-emerald-500/50 hover:shadow-emerald-500/20 ${reverse ? 'md:text-right' : 'md:text-left'}`}>
            
            <div className="space-y-4 relative">
                <div className={`flex items-center gap-3 ${reverse ? 'justify-end' : 'justify-start'}`}>
                  <div className="h-4 w-1 bg-emerald-500 animate-bounce" />
                  <span className="text-emerald-500 font-mono text-sm font-black tracking-[0.4em] uppercase">{role}</span>
                </div>
                <h2 className="text-6xl font-black text-white tracking-tight leading-none group-hover/card:text-emerald-50 transition-colors">
                    {name}
                </h2>
            </div>

            <div className={`relative p-6 bg-black/60 rounded-2xl border-l-4 border-emerald-500 shadow-inner group-hover/card:scale-[1.02] transition-transform duration-500`}>
                <p className="text-slate-200 leading-relaxed text-lg font-medium italic">
                    "{description}"
                </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className={`flex gap-4 ${reverse ? 'md:justify-end' : 'md:justify-start'}`}>
                {[
                  {href: Linkedin, img: LinkedinImage},
                  {href: Github, img: GithubImage},
                  {href: Leetcode, img: LeetcodeImage}
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group/btn p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl hover:bg-emerald-500 transition-all duration-500 shadow-lg"
                  >
                      <img src={social.img} alt="social" className="w-6 h-6 invert group-hover/btn:invert-0 transition-all" />
                  </a>
                ))}
            </div>
        </div>

        {/* GLOWING MESH SCANNER SECTION */}
        <div className="flex-1 w-full flex justify-center [perspective:2000px]">
            <div className="relative group/img [transform-style:preserve-3d] transition-all duration-700 hover:[transform:rotateY(-10deg)rotateX(5deg)]">
                
                {/* Neon Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[4rem] blur opacity-20 group-hover/img:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                
                {/* IMAGE CONTAINER */}
                <div className="relative overflow-hidden rounded-[3.5rem] border-4 border-white/10 shadow-2xl">
                  
                  {/* The Image */}
                  <img 
                      src={image} 
                      alt={name} 
                      className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] object-cover transition-all duration-1000 group-hover/img:scale-110" 
                  />

                  {/* 1. FORENSIC MESH OVERLAY (Reveals on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover/img:opacity-40 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
                       style={{ backgroundImage: `radial-gradient(#10b981 1px, transparent 0)`, backgroundSize: '15px 15px' }}>
                  </div>

                  {/* 2. SCANNING LINE (Using arbitrary keyframes) */}
                  <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                    <style>
                      {`
                        @keyframes scanVertical {
                          0% { transform: translateY(-100%); }
                          100% { transform: translateY(1000%); }
                        }
                      `}
                    </style>
                    <div className="w-full h-1 bg-emerald-500 shadow-[0_0_15px_#10b981] animate-[scanVertical_3s_linear_infinite]" />
                  </div>

                  {/* 3. RADIAL SCAN EFFECT */}
                  <div className="absolute inset-0 opacity-0 group-hover/img:opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#10b981_0%,_transparent_70%)] animate-pulse" />
                  </div>
                </div>
                
                {/* Overlay Badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max bg-black border-2 border-emerald-500 text-emerald-500 font-black text-[10px] px-8 py-3 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] tracking-[0.3em] uppercase">
                    Forensic ID: {name.split(' ')[0]} // VERIFIED
                </div>
            </div>
        </div>
    </div>
  );
}

export default ProfileCard;