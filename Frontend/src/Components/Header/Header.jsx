import React, { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "History", slug: "/history", active: authStatus },
    { name: "About-Us", slug: "/about", active: true },
  ];

  return (
    <header className="w-full bg-[#0a0c10]/80 border-b border-slate-800/60 sticky top-0 z-50 backdrop-blur-md">
      <div className="h-16 px-6 md:px-8 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="text-black font-bold text-xs">AS</span>
          </div>
          <h1 className="text-slate-100 font-semibold tracking-tight text-lg">
            Authen-Sight
          </h1>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex h-full">
          <ul className="flex items-center h-full gap-1">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="h-full flex items-center">
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `px-5 py-2 text-sm font-medium transition-all rounded-md ${
                          isActive
                            ? "text-emerald-400 bg-emerald-500/10 shadow-inner"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </nav>

        {/* DESKTOP LOGOUT */}
        {authStatus && (
          <div className="hidden md:flex items-center gap-4 border-l border-slate-800 pl-6 h-8">
            <LogoutBtn />
          </div>
        )}

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-300 hover:text-white focus:outline-none"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0a0c10]/95 backdrop-blur-xl">
          <ul className="flex flex-col py-4 px-6 gap-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-md text-sm font-medium transition-all ${
                        isActive
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
            )}

            {authStatus && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <LogoutBtn />
              </div>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
