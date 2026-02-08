import React, { useEffect, useState } from 'react'
import { api } from './Axios/axios'
import { useNavigate, useParams } from 'react-router-dom'

function Query() {
    const _id = useParams()
    const navigate = useNavigate()
    const [query, setQuery] = useState({})
    let image = null
    if(query.type === "image") image = true
    else image = false
    useEffect(() => {
      const getQuery = async () => {
        const data = await api.post("/query/getquery", {
          _id
        })
        setQuery(data.data.data)
            // console.log(data.data.data)
        }
        getQuery()
    },[])
    const navigateToHome = () => {
        navigate("/")
    }
  return (
  <div className="min-h-screen w-screen bg-[#02040a] flex flex-col items-center px-4 relative overflow-hidden">
  
  {/* Forensic Background Ambient Glows */}
  <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/5 blur-[120px] pointer-events-none" />
  <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/5 blur-[120px] pointer-events-none" />

  <div className="flex items-center justify-center w-full py-12 md:py-24 relative z-10">
    <div className="w-full max-w-5xl bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 overflow-hidden">
      
      {/* Left: Forensic Metrics */}
      <div className="flex-1 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">
              Forensic Report
            </h2>
          </div>
          <p className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase pl-4">
            Analysis Reference: {query._id?.slice(-8).toUpperCase() || "INTERNAL_GEN"}
          </p>
        </div>

        <div className="grid gap-6">
          {/* Claim Metric */}
          <div className="bg-black/40 rounded-2xl p-6 border border-white/5 group hover:border-emerald-500/30 transition-colors">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
              Detection Label
            </p>
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full animate-pulse ${query.ansClaim ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-red-500 shadow-[0_0_12px_#ef4444]'}`} />
              <p className={`text-2xl font-black tracking-tight uppercase ${query.ansClaim ? "text-emerald-400" : "text-red-400"}`}>
                {query.ansClaim ? "Verified Authentic" : "Synthetic Detect"}
              </p>
            </div>
          </div>

          {/* Surety Metric */}
          <div className="bg-black/40 rounded-2xl p-6 border border-white/5 group hover:border-emerald-500/30 transition-colors">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Neural Confidence Score
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-5xl md:text-6xl font-black font-mono text-white tracking-tighter italic">
                {query.ansPerc}
              </p>
              <span className="text-xl font-black text-emerald-500">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Forensic Media Viewer */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-sm md:max-w-md rounded-[2.5rem] overflow-hidden border-2 border-white/5 shadow-2xl bg-black aspect-square md:aspect-auto">
          
          {/* Scanline / HUD Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          
          {/* Horizontal Scanning Line */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             <div className="w-full h-[2px] bg-emerald-500/50 shadow-[0_0_15px_#10b981] animate-[scanVertical_4s_linear_infinite]" 
                  style={{ animationName: 'scanVertical' }} />
             <style>{`
                @keyframes scanVertical {
                  0% { transform: translateY(-100%); }
                  100% { transform: translateY(1000%); }
                }
             `}</style>
          </div>

          {image ? (
            <img
              src={query.queryObject}
              alt="Analyzed content"
              className="w-full max-h-[400px] object-contain relative z-0"
            />
          ) : (
            <video
              src={query.queryObject}
              className="w-full h-full object-contain relative z-0"
              controls
              playsInline
            />
          )}

          {/* Technical Corner Accents */}
          <div className="absolute top-4 left-4 border-t-2 border-l-2 border-emerald-500/40 w-8 h-8 rounded-tl-xl z-20" />
          <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-emerald-500/40 w-8 h-8 rounded-br-xl z-20" />
        </div>
      </div>
    </div>
  </div>

  {/* CTA Button */}
  <button
    onClick={navigateToHome}
    type="button"
    className="relative group px-12 py-4 mb-12 rounded-2xl bg-emerald-600 overflow-hidden shadow-xl shadow-emerald-900/20 active:scale-95 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]" />
    <span className="relative z-10 text-white font-black uppercase tracking-[0.2em] text-sm">
      New Analysis Node
    </span>
  </button>
</div>
);


}

export default Query
