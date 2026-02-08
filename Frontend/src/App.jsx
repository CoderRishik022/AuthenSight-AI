import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { Header, Footer } from './Components'; // Import both from the index
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(false);
  
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-[#0a0c10] text-[#e2e8f0] font-sans'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0a0c10] text-emerald-500">
       Loading System...
    </div>
  );
}

export default App;