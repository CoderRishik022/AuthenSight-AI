import React from "react";
import ProfileCard from "./ProfileCard.jsx";
import RishikImage from "../../assets/RishikProfilePic.jpeg";
import YashImage from "../../assets/YashProfilePic.jpg";
import AmanImage from "../../assets/AmanProfilePic.jpeg"; 

function Profiles() {
    const ProfileInformation = [
        {
            name: "Yash Goyal",
            image: YashImage,
            role: "LEAD ARCHITECT",
            description: "Second-year B.Tech CSE student specializing in reactive architectures and data structures. Focused on pixel forensics and interface performance.",
            Linkedin: "https://www.linkedin.com/in/yash-goyal108/",
            Github: "https://github.com/groxyash",
            Leetcode: "https://leetcode.com/u/groxMrParam/"
        },
        {
            name: "Rishik Uchadiya",
            image: RishikImage,
            role: "ML STRATEGIST",
            description: "Specializing in machine learning and data-driven systems. Exploring neural transformations and real-world algorithmic solutions.",
            Linkedin: "https://www.linkedin.com/in/rishik-uchadiya-35a8b6312",
            Github: "https://github.com/CoderRishik022",
            Leetcode: "https://leetcode.com/u/Rishik022/"
        },
        {
            name: "Aman Kumar",
            image: AmanImage,
            role: "CORE ENGINEER",
            description: "Algorithm strategist and web engineer. Combining competitive programming discipline with modern responsive technologies.",
            Linkedin: "https://www.linkedin.com/in/aman-kumar-verma-113a17323/",
            Github: "https://github.com/Aman0728",
            Leetcode: "https://leetcode.com/u/Aman728/"
        }
    ];

    return (
        <div className="bg-[#010205] min-h-screen py-32 px-8 overflow-hidden relative">
            {/* Animated Grid Background (Pure Tailwind) */}
            <div className="fixed inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(#10b981 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }}>
            </div>

            {/* Neon Ambient Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/10 blur-[150px] pointer-events-none animate-pulse" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/10 blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-48 relative z-10">
                <div className="text-center space-y-4">
                    <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter italic scale-y-110 drop-shadow-[0_0_35px_rgba(16,185,129,0.5)]">
                        THE <span className="text-emerald-500 animate-pulse">CORE</span> UNIT
                    </h1>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-emerald-400 font-mono text-xs md:text-sm tracking-[0.8em] uppercase bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20">
                            Neural Intelligence Division
                        </p>
                        <div className="w-px h-24 bg-gradient-to-b from-emerald-500 to-transparent shadow-[0_0_15px_emerald]" />
                    </div>
                </div>

                <div className="space-y-40">
                    {ProfileInformation.map((profiles, index) => (
                        <ProfileCard 
                            key={profiles.name} 
                            {...profiles} 
                            reverse={index % 2 !== 0} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profiles;