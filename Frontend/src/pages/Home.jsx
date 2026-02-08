import React, { useRef } from 'react'
import { FolderInput } from "../Components"

function Home() {
  const analysisRef = useRef(null);

  const scrollToAnalysis = () => {
    analysisRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#02040a]">
      {/* HERO SECTION */}
      <section className="h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/[0.02] blur-[150px] pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Next-Gen Media Forensics
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
          VERIFY REALITY <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-600">
            DIGITAL AGE.
          </span>
        </h1>
        
        <p className="max-w-2xl text-slate-500 text-lg md:text-xl mb-12 leading-relaxed font-medium">
          Authen-Sight utilizes advanced neural analysis to detect manipulations in pixel forensics, 
          securing digital integrity in a synthetic world.
        </p>

        <button 
          onClick={scrollToAnalysis}
          className="group relative px-10 py-5 bg-emerald-500 text-black font-black rounded-xl transition-all duration-300 transform hover:scale-105 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.3)] uppercase tracking-widest text-sm"
        >
          Begin Analysis
        </button>
      </section>

      {/* STATS SECTION - Added for content depth */}
      <section className="py-24 border-y border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="space-y-2">
            <h3 className="text-emerald-500 text-5xl font-black tracking-tighter">96.0%</h3>
            <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold">Detection Accuracy</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-emerald-500 text-5xl font-black tracking-tighter">&lt;2s</h3>
            <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold">Inference Speed</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-emerald-500 text-5xl font-black tracking-tighter">API</h3>
            <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold">Forensic Integration</p>
          </div>
        </div>
      </section>

      {/* INPUT SECTION */}
      <section ref={analysisRef} className="min-h-screen flex flex-col items-center justify-center bg-[#02040a] py-32 px-6">
        <div className="mb-16 text-center">
           <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Forensic Analysis Node</h2>
           <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">System ready for source input</p>
        </div>
        <FolderInput />
      </section>
    </div>
  )
}

export default Home