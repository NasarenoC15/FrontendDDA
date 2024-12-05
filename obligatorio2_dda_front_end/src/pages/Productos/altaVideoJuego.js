'use client';
import React from 'react'
import { useState } from 'react';
// src/pages/_app.js
import '../../app/globals.css'; // Verifica la ruta a tu archivo CSS
import 'tailwindcss/tailwind.css'; // Verifica la ruta a tu archivo CSS

const AltaVideoJuego = () => {

   // useTokenVerification(); // Verifica que el token sea valido y este logueado

   const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState([
        {id: 1, nombre: 'accion'},
        {id: 2, nombre: 'aventura'},
        {id: 3, nombre: 'deportes'},
        {id: 4, nombre: 'estrategia'},
        {id: 5, nombre: 'simulacion'},
        {id: 6, nombre: 'otros'}
    ]);
    
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [imagen, setImagen] = useState('');
    const [url, setUrl] = useState(''); // Trailer

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(nombre,categoria,descripcion,precio,cantidad,imagen,url);
    }

    const handleNombre = (e) => {
        setNombre(e.target.value);
    }

    const handleCategoria = (e) => {
        setCategoria(e.target.value);
    }

    const handleCategoriaSeleccionada = (e) => {
        setCategoriaSeleccionada(e.target.value);
    }
    
  
    const handleDescripcion = (e) => {
        setDescripcion(e.target.value);
    }

    const handlePrecio = (e) => {
        setPrecio(e.target.value);
    }

    const handleCantidad = (e) => {
        setCantidad(e.target.value);
    }

    const handleImagen = (e) => {
        setImagen(e.target.value);
    }

    const handleUrl = (e) => {
        setUrl(e.target.value);
    }




    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <div className='grid grid-cols-5'>
        <img></img><img></img>
          <img src="https://media.istockphoto.com/id/1353479729/es/vector/juego-inal%C3%A1mbrico-joystick-controlador-gamepad-gamepad-inal%C3%A1mbrico-abstracto-dibujo-colorido.jpg?s=612x612&w=0&k=20&c=mp1eadgrTe4Jk9IYvYp28ZQykDB6xi9yHYe9ktunnuk=" alt="Placeholder Image" className="object-cover w-24 h-24 " />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-4 text-center">Alta Video Juego</h1>
      
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={handleNombre}
                placeholder="Nombre del videojuego"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>
      
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
             <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
                >
                <option value="">Seleccione una categoría</option>
                {categoria.map((cat) => (
                    <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                    </option>
                ))}
            </select>

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                value={descripcion}
                onChange={handleDescripcion}
                placeholder="Describe el videojuego"
                rows="4"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              ></textarea>
            </div>
      
            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                value={precio}
                onChange={handlePrecio}
                type="number"
                placeholder="Precio en USD"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cantidad de Copias</label>
              <input
                value={cantidad}
                onChange={handleCantidad}
                type="number"
                placeholder="Cantidad disponible"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Imagen</label>
              <input
                value={imagen}
                onChange={handleImagen}
                type="file"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>
      
            <div>
              <label className="block text-sm font-medium text-gray-700">URL - Trailer</label>
              <input
                value={url}
                onChange={handleUrl}
                type="text"
                placeholder="Link del trailer del videojuego"
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
      
    )
}

export default AltaVideoJuego