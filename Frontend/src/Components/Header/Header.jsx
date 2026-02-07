import React from "react";
import { Container, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

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
      slug: "about",
      active: true,
    },
  ];
return (
  <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
    <Container>
      <nav className="flex items-center py-3 md:py-4">
        
        {/* Logo – hidden on mobile */}
        <div className="hidden md:block text-white font-bold text-lg">
          {/* Logo here if needed */}
        </div>

        {/* Nav Items */}
        <ul
          className="
            flex items-center space-x-1 md:space-x-2
            mx-auto md:ml-auto md:mx-0
          "
        >
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `
                      px-4 md:px-6 py-2 text-xs md:text-sm font-medium rounded-full
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-indigo-600/20 text-indigo-400"
                          : "text-gray-300 hover:text-white hover:bg-gray-800"
                      }
                    `
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
        </ul>

        {/* Logout */}
        {authStatus && (
          <div className="ml-2 md:ml-4">
            <LogoutBtn />
          </div>
        )}
      </nav>
    </Container>
  </header>
);



}

export default Header;
