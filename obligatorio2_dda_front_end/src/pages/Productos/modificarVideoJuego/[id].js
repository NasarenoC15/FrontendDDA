"use client";
import React, { useState, useEffect } from "react";
import "../../../app/globals.css";
import "tailwindcss/tailwind.css";
import Header from "../../../components/header";
import { obtenerCategorias } from "../../../api/Categorias/obtenerCategorias";
import { modificarVideoJuego } from "../../../api/VideoJuegos/modificarVideoJuego";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { obtenerVideoJuego } from "@/api/VideoJuegos/obtenerVideoJuego";

const ModificarVideoJuego = () => {

    const router = useRouter();
    const {id} = router.query;

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [imagen, setImagen] = useState(null); // Cambiado a archivo
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await obtenerCategorias();
      if (response.data) {
        setCategoria(response.data);
      } else {
        Swal.fire({
          title: "Error al obtener las categorías",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };
    const fetchVideoJuego = async () => {
        const response = await obtenerVideoJuego(id);
        if(response.data){
            setNombre(response.data.nombre);
            setCategoriaSeleccionada(response.data.categoria.id);
            setDescripcion(response.data.descripcion);
            setPrecio(response.data.precio);
            setCantidad(response.data.stock);
            setUrl(response.data.trailer);
            console.log(response.data);
        }else{
            Swal.fire({
                title: 'Error al obtener el videojuego',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    fetchCategorias();
    fetchVideoJuego();
  }, []);

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleCategoria = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const handleDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  const handlePrecio = (e) => {
    setPrecio(e.target.value);
  };

  const handleCantidad = (e) => {
    setCantidad(e.target.value);
  };
  const handleImagen = (e) => {
    setImagen(e.target.files[0]);
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Data = reader.result.split(",")[1]; // Eliminar "data:image/jpeg;base64,"
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };
  

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };




  const handleSubmit = async (e) => {

   

    e.preventDefault();
    if(!nombre === "" ){
        Swal.fire({
            title: "El nombre es requerido",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            });
            return;
    }
    if(categoriaSeleccionada === "" ){
        Swal.fire({
            title: "La categoría es requerida", 
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            });
            return;
    }
    if(descripcion === "" ){
        Swal.fire({
            title: "La descripción es requerida",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            });
            return;
    }
    if(precio === "" ){
        Swal.fire({
            title: "El precio es requerido",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            });
            return;
    }
    if(cantidad === "" ){
        Swal.fire({
            title: "La cantidad es requerida",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            });
            return;
    }
    if(url === "" ){
        Swal.fire({
            title: "La URL es requerida",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            });
            return;
    }

    
    console.log(nombre, categoriaSeleccionada, descripcion, precio, cantidad, imagen, url);
    let imagenBase64 = '';
    if(imagen !== null){
      imagenBase64 = await convertToBase64(imagen);
    }else{
        Swal.fire({
            title: "La imagen es requerida",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            });
            return;
    }
    const response = await modificarVideoJuego(id,nombre, categoriaSeleccionada, descripcion, precio, cantidad, imagenBase64, url);

    if (response.status ===200) {
      Swal.fire({
        title: "Videojuego modificado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setNombre("");
      setCategoriaSeleccionada("");
      setDescripcion("");
      setPrecio("");
      setCantidad("");
      setImagen(null);
      setUrl("");
      router.push("/Productos/listadoDeVideoJuego");
    } else {
      Swal.fire({
        title: "Error al agregar el videojuego",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-4 text-center">
            Alta Video Juego
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={handleNombre}
                placeholder="Nombre del videojuego"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categoría
              </label>
              <select
                value={categoriaSeleccionada}
                onChange={ handleCategoria}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              >
                <option value="">Seleccione una categoría</option>
                {categoria &&
                  categoria.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={handleDescripcion}
                placeholder="Describe el videojuego"
                maxLength={255}
                rows="4"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <input
                type="number"
                value={precio}
                onChange={handlePrecio}
                placeholder="Precio en USD"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cantidad de Copias
              </label>
              <input
                type="number"
                value={cantidad}
                onChange={handleCantidad}
                placeholder="Cantidad disponible"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagen
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImagen}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL - Trailer
              </label>
              <input
                type="text"
                value={url}
                onChange={handleUrl}
                placeholder="Link del trailer del videojuego"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>

            <div>
              <button
                type="submit"
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

export default ModificarVideoJuego;
