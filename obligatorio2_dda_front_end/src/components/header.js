import React, { use } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useState, useEffect} from 'react';



const Header = () => {

    const router = useRouter();
    const handleGoDashboard = () => {
        router.push('../../Admin/dashboard');
    }

    const [cantidadCarrito, setCantidadCarrito] = useState(0);

    useEffect(() => {
      const updateCantidadCarrito = () => {
        const carrito = localStorage.getItem('carrito');
        if (carrito) {
          setCantidadCarrito(JSON.parse(carrito).length);
        }
      };

      updateCantidadCarrito();

      window.addEventListener('storage', updateCantidadCarrito);

      const originalSetItem = localStorage.setItem;
      localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (key === 'carrito') {
          updateCantidadCarrito();
        }
      };

      return () => {
        window.removeEventListener('storage', updateCantidadCarrito);
        localStorage.setItem = originalSetItem;
      };
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('admin');
        localStorage.removeItem('carrito');
        router.push('../../');
    }


    return (
      <header>
        <nav className="navbar bg-base-100 shadow-md">
          {/* Logo Section */}
          <div className="flex-1">
            <a className="btn btn-ghost text-xl font-bold" onClick={handleGoDashboard}>
              Gamers4Ever
            </a>
          </div>
  
          {/* Actions Section */}
          <div className="flex-none flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item text-black">{cantidadCarrito}</span>
                </div>
              </button>
            </div>
  
            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Configuraciones</a>
                </li>
                <li>
                  <button onClick={handleLogOut}>Cerrar Sesión</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  };
  
  export default Header;
  