import React from "react";
import LogoutBtn from "./LogoutBtn"; // Direct local import
import Container from "../Container"; // Step out once to get Container
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// ... rest of your Header code

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "History",
      slug: "/history",
      active: authStatus,
    },
    {
      name: "About-Us",
      slug: "/about",
      active: true,
    },
  ];

  return (
    <header className="w-full h-16 bg-[#0a0c10]/80 border-b border-slate-800/60 px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {/* Updated logo color to Emerald to match your new theme */}
        <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <span className="text-black font-bold text-xs">AS</span>
        </div>
        <h1 className="text-slate-100 font-semibold tracking-tight text-lg">
          Authen-Sight
        </h1>
      </div>

      <nav className="h-full">
        <ul className="flex items-center h-full gap-1">
          {navItems.map((item) =>
            item.active ? (
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
            ) : null
          )}
        </ul>
      </nav>

      {authStatus && (
        <div className="flex items-center gap-4 border-l border-slate-800 pl-6 h-8">
          <LogoutBtn />
        </div>
      )}
    </header>
  );
}

export default Header;