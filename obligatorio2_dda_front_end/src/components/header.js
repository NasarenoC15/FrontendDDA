import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const router = useRouter();

  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  useEffect(() => {
    const updateCantidadCarrito = () => {
      const carrito = localStorage.getItem("carrito");
      if (carrito) {
        setCantidadCarrito(JSON.parse(carrito).length);
      }
    };

    updateCantidadCarrito();
    window.addEventListener("storage", updateCantidadCarrito);

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "carrito") {
        updateCantidadCarrito();
      }
    };

    return () => {
      window.removeEventListener("storage", updateCantidadCarrito);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  const handleGoDashboard = () => {
    router.push("../../Admin/dashboard");
  };

  const handleLogOut = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("carrito");
    router.push("../../");
  };

  const handleCheckOut = () => {
    router.push("../../Carrito/verCarrito");
  };

  return (
    <header>
      <nav className="navbar bg-gray-900 text-white shadow-lg py-4 px-6">
        {/* Logo Section */}
        <div className="flex-1">
          <a
            className="ml-10 text-3xl font-bold tracking-widest text-gradient cursor-pointer"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
            onClick={handleGoDashboard}
          >
            Gamers4Ever
          </a>
        </div>

        {/* Actions Section */}
        <div className="flex-none flex items-center space-x-6 mr-10">
          {/* Cart Icon */}
          <div className="relative mr-2">
            <button className="btn btn-ghost btn-circle" onClick={handleCheckOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white" 
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cantidadCarrito}
              </span>
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </button>
            <ul className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-gray-800 text-white shadow-lg">
              <li>
                <a>Profile</a>
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

      {/* Custom CSS for the text gradient */}
      <style jsx>{`
        .text-gradient {
          background: linear-gradient(to right, #ff7e5f, #feb47b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </header>
  );
};

export default Header;