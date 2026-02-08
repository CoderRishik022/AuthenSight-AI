import React, { useEffect, useState } from 'react';
import { api } from './Axios/axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function History() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await api.post("/user/history");
        setHistory((data.data.data).reverse());
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const close = () => setOpenMenuId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.post("/query/deleteQuery", { _id: id });
      setHistory(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0c10] text-slate-200 selection:bg-emerald-500/30">
      {/* Ambient Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-1.5 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
              <h1 className="text-5xl font-black text-white tracking-tight uppercase italic">
                Archive<span className="text-emerald-500 text-2xl not-italic ml-2">.LOG</span>
              </h1>
            </div>
            <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">
              Terminal Access // {history.length} encrypted entries
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
              <p className="text-[10px] text-slate-500 uppercase font-bold">System Status</p>
              <p className="text-emerald-400 font-mono text-sm">OPERATIONAL</p>
            </div>
          </div>
        </header>

        {/* Empty State */}
        {!loading && history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
            <div className="w-20 h-20 mb-6 rounded-full bg-slate-900 flex items-center justify-center border border-white/10">
              <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Records Found</h3>
            <p className="text-slate-500 font-mono text-sm uppercase tracking-tighter">Your digital footprint is currently empty.</p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((e) => (
              <div key={e._id} className="relative group">
                <Link
                  to={`/query/${e._id}`}
                  className="block h-full bg-[#11141b] border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
                >
                  {/* Visual Preview */}
                  <div className="h-64 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                    {e.type === "video" ? (
                      <video
                        src={e.queryObject}
                        className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={e.queryObject}
                        alt="Analyzed"
                        className="object-cover w-full h-full scale-105 group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    
                    {/* Status Pill */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className={`px-4 py-1.5 rounded-full backdrop-blur-xl border flex items-center gap-2 ${e.ansClaim ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${e.ansClaim ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${e.ansClaim ? 'text-emerald-400' : 'text-red-400'}`}>
                          {e.ansClaim ? 'Authentic' : 'Synthetic'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Data Section */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[10px] font-mono text-slate-500 uppercase mb-1">Index Reference</p>
                        <h2 className="text-white font-black text-xl tracking-tight">#{e._id.slice(-6).toUpperCase()}</h2>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-mono text-slate-500 uppercase mb-1">Confidence</p>
                        <p className="text-2xl font-black text-white italic">
                          {e.ansPerc}<span className="text-emerald-500 text-sm ml-1">%</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                        Deep Analysis <span className="text-lg">→</span>
                      </span>
                      <span className="text-[9px] font-mono text-slate-600">TIMESTAMP_{new Date().getFullYear()}</span>
                    </div>
                  </div>
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute top-6 right-6 z-30">
                  <button
                    onClick={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      setOpenMenuId(openMenuId === e._id ? null : e._id);
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-emerald-500 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                  </button>

                  {openMenuId === e._id && (
                    <div 
                      className="absolute top-12 right-0 w-48 bg-[#1a1f26] border border-white/10 rounded-2xl shadow-2xl z-50 py-2 animate-in slide-in-from-top-2 duration-200"
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      <button
                        className="flex items-center gap-3 w-full px-4 py-3 text-[10px] font-black text-red-400 hover:bg-red-500/10 transition-colors uppercase tracking-[0.2em]"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          handleDelete(e._id);
                          setOpenMenuId(null);
                        }}
                      >
                        Delete Entry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;