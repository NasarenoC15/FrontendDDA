'use client';
import React, { useEffect } from 'react'
import { useState } from 'react';
// src/pages/_app.js
import '../../app/globals.css'; // Verifica la ruta a tu archivo CSS
import 'tailwindcss/tailwind.css'; // Verifica la ruta a tu archivo CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../components/header";
import { agregarCategoria } from '../../api/Categorias/agregarCategoria';
import Swal from 'sweetalert2';


const AltaCategoria = () => {

  // useTokenVerification(); // Verifica que el token sea valido y este logueado

  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await agregarCategoria(nombre);

    if (response) {
      Swal.fire({
        title: 'Categoria agregada',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      setNombre('');

    } else {
      Swal.fire({
        title: 'Error al agregar la categoria',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  const handleNombre = (e) => {
    setNombre(e.target.value);
  }

  return (
    <div><Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <div className='grid grid-cols-5'>
            <img></img><img></img>
            <img src="https://media.istockphoto.com/id/1353479729/es/vector/juego-inal%C3%A1mbrico-joystick-controlador-gamepad-gamepad-inal%C3%A1mbrico-abstracto-dibujo-colorido.jpg?s=612x612&w=0&k=20&c=mp1eadgrTe4Jk9IYvYp28ZQykDB6xi9yHYe9ktunnuk=" alt="Placeholder Image" className="object-cover w-24 h-24 " />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-4 text-center">Alta Categoria</h1>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre de Categoria</label>
              <input
                type="text"
                value={nombre}
                onChange={handleNombre}
                placeholder="Nombre"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-3 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AltaCategoria