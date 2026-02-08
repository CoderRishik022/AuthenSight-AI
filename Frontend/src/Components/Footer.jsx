// Footer.jsx
import React from 'react'

const Footer = () => (
  <footer className="border-t border-slate-900 py-12 px-8 bg-[#0a0c10]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-slate-500 text-sm italic">
        © 2026 Authen-Sight. Protecting digital integrity.
      </div>
      <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
        <a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a>
        <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
        <a href="#" className="hover:text-emerald-400 transition-colors">API</a>
      </div>
    </div>
  </footer>
);

export default Footer;