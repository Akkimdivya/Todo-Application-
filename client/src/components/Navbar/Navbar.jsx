import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars, FaDailymotion } from "react-icons/fa";
import { FaArrowsToDot, FaXmark } from "react-icons/fa6";
import './Navbar.css';
import { getAuth, signOut } from "firebase/auth"; // Import Firebase signOut and getAuth

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // React Router's hook for navigation
  const auth = getAuth(); // Get the Firebase Auth instance

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Firebase sign out
    signOut(auth)
      .then(() => {
        // Successfully signed out
        localStorage.clear(); // Clear any local storage if needed
        navigate('/login'); // Redirect to the login page
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const navItems = [
    {
      path: "/", title: "All TODOs"
    },
    {
      path: "/your-tasks", title: "Your TODOs"
    },
    {
      path: "/post-task", title: "Create TODO"
    },
  ];

  return (
    <header>
      <nav className='main-nav '>
        <a href='/'>
          <FaArrowsToDot size={35} color="#fffff" />
        </a>

        {/* Nav items */}
        <div>
          <ul className='hidden md:flex gap-6 space'>
            {
              navItems.map(({ path, title }) => (
                <li key={path} className='text-base text-primary'>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "active" : ""
                    }
                  >
                    {title}
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </div>

        <div className='text-base text-primary font-medium space-x-5 hidden md:block '>
          <button onClick={handleLogout} className='py-2 px-5 border rounded text-white'>
            Logout
          </button>
        </div>

        {/* Mobile menu */}
        <div className='md:hidden block'>
          <button onClick={handleMenuToggler}>
            {
              isMenuOpen ? <FaXmark className='w-5 h-5 text-white' /> : <FaBars className='w-5 h-5 text-white' />
            }
          </button>
        </div>
      </nav>

      {/* Nav items for mobile */}
      <div className={`px-4 py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {
            navItems.map(({ path, title }) => (
              <li key={path} className='text-base py-1'>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "active" : ""
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))
          }
          <li className='py-1'>
            <button onClick={handleLogout} className='w-full text-left'>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
