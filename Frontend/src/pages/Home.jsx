import React from 'react'
import {FolderInput} from "../Components"
import {useRef} from 'react'

function Home() {
  const analysisRef = useRef(null);

  const scrollToAnalysis = () => {
    analysisRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
      {/* HERO SECTION */}
      <section className="h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Next-Gen Media Forensics
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Verify reality in the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            digital age.
          </span>
        </h1>
        
        <p className="max-w-2xl text-slate-400 text-lg md:text-xl mb-10 leading-relaxed">
          Authen-Sight uses advanced neural analysis to detect manipulations in images and videos, 
          ensuring your content remains trusted and untampered.
        </p>

        <button 
          onClick={scrollToAnalysis}
          className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-emerald-400 transition-all duration-300 transform hover:scale-105"
        >
          Begin Analysis
        </button>
      </section>

      {/* INPUT SECTION */}
      <section ref={analysisRef} className="min-h-screen flex items-center justify-center bg-[#0d1117] py-20">
        <FolderInput />
      </section>
    </div>
  )
}

export default Home
