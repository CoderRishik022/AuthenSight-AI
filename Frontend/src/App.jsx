import React, { useState } from 'react';
import { Header, Footer } from './Components'; 
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const [loading] = useState(false);
  
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-[#02040a] text-[#e2e8f0] font-sans selection:bg-emerald-500/30 selection:text-emerald-200'>
      <Header />
      <main className='flex-grow relative'>
        {/* Background Ambient Glow */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#02040a]">
       <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
       <p className="text-emerald-500 font-mono tracking-widest animate-pulse">Initializing Neural Engine...</p>
    </div>
  );
}

export default App;