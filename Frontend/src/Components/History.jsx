import React, {useEffect, useState} from 'react'
import { api } from './Axios/axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function History() {
  const [openMenuId, setOpenMenuId] = useState(null)
    const userdata = useSelector(state => state.auth.userdata)
    const [history, setHistory] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await api.post("/user/history",)
            console.log(data.data.data)
            setHistory((data.data.data).reverse())
        }
        getData()
    },[])
    useEffect(() => {
      const close = () => setOpenMenuId(null)
      window.addEventListener("click", close)
      return () => window.removeEventListener("click", close)
    }, [])

    const handleDelete = async (id) => {
      try {
        await api.post("/query/deleteQuery", { _id: id }) 
        setHistory(prev => prev.filter(item => item._id !== id))
      } catch (err) {
        console.error("Failed to delete", err)
      }
    }
    if(history.length === 0) return <p>Loading History</p>
    return (
  <div className="min-h-screen w-screen bg-[#02040a] p-8 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
              Forensic Archive
            </h1>
          </div>
          <p className="text-slate-500 font-mono text-xs tracking-[0.3em] uppercase pl-11">
            Historical Data Logs // {history.length} Records Found
          </p>
        </header>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {history.map((e) => (
            <div key={e._id} className="relative group">
              {/* Card Container */}
              <Link
                to={`/query/${e._id}`}
                className="block h-full bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.25)] group-hover:-translate-y-2"
              >
                {/* Media Container with Scanline Effect */}
                <div className="h-56 bg-black relative flex items-center justify-center overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                  
                  {e.type === "video" ? (
                    <video
                      src={e.queryObject}
                      className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={e.queryObject}
                      alt="Analyzed content"
                      className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                  )}
                  
                  {/* Forensic Badge on Media */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400 px-3 py-1 rounded-full uppercase tracking-widest">
                      ID: {e._id.slice(-6)}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-5">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Analysis Result</p>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full animate-pulse ${e.ansClaim ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`} />
                        <span className={`text-lg font-black uppercase tracking-tighter ${e.ansClaim ? 'text-emerald-400' : 'text-red-400'}`}>
                          {e.ansClaim ? 'Verified Authentic' : 'Synthetic Detect'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Confidence</p>
                      <span className="text-2xl font-mono font-black text-white italic">
                        {e.ansPerc}<span className="text-emerald-500 text-sm ml-0.5">%</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest group-hover:text-emerald-500/50 transition-colors">
                      View Full Forensics →
                    </span>
                  </div>
                </div>
              </Link>

              {/* Action Menu (Three-dot) - Kept outside Link for stopPropagation */}
              <div className="absolute top-4 right-4 z-30">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:border-emerald-500 transition-all"
                  onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    setOpenMenuId(openMenuId === e._id ? null : e._id);
                  }}
                >
                  <span className="mb-2 tracking-tighter text-2xl font-black">...</span>
                </button>

                {openMenuId === e._id && (
                  <div
                    className="absolute top-12 right-0 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors uppercase tracking-widest"
                      onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        handleDelete(e._id);
                        setOpenMenuId(null);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Purge Record
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  

);


}

export default History



    