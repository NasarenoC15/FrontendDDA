"use client";
import React, { useState, useEffect, use } from "react";
import "../../../app/globals.css";
import "tailwindcss/tailwind.css";
import Header from "../../../components/header";
import Swal from "sweetalert2";
import { obtenerVideoJuego } from "../../../api/VideoJuegos/obtenerVideoJuego";
import { useRouter } from "next/router";

const DetalleVideoJuego = () => {

    const router = useRouter();
    const { id } = router.query;

    const [videoJuego, setVideoJuego] = useState({});

    const [categoria , setCategoria] = useState("");
    const [idYouTube,setIdYouTube] = useState("");
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const fetchVideoJuego = async () => {
            try {
                const response = await obtenerVideoJuego(id);
                if(response.data){
                    setVideoJuego(response.data);
                    setCategoria(response.data.categoria.nombre)
                    setIdYouTube(getYouTubeID(response.data.trailer))
                    const carrito = localStorage.getItem('carrito');
                    if(carrito){
                        setCarrito(JSON.parse(carrito));
                    }
                } else {
                    throw new Error('No data found');
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error al obtener el videojuego',
                    text: error.message,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(error);
            }
        }
        if (id) {
            fetchVideoJuego();
        }
    }, [id]);

    const getYouTubeID = (url) => {
        const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
        return match ? match[1] : null;
      };
      
      const handleActualizarCarrito = (id) => {
        return () => {
            Swal.fire({
                title: 'Producto agregado al carrito',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            setCarrito([...carrito, id]);
            
            localStorage.setItem('carrito', JSON.stringify([...carrito, id]));
        }
    }

    
      

    return (
        <div>
        <Header />
        <h1 className="text-3xl font-bold text-center mt-4 mb-8">Detalle del Videojuego</h1>
        <div className="flex flex-col items-center p-4">
          {/* Información general */}
          <div className="bg-white text-center shadow-lg rounded-lg p-6 w-full max-w-lg">
            <img
              src={videoJuego.imagen}
              alt={videoJuego.nombre}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{videoJuego.nombre}</h2>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Categoría: </strong> {categoria}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Descripción: </strong> {videoJuego.descripcion}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-4">
              <strong>Precio: </strong> ${videoJuego.precio}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Stock disponible: </strong> {videoJuego.stock}
            </p>
          </div>
      
          {/* Reproductor de YouTube */}
          <div className="bg-white shadow-lg rounded-lg text-center p-6 w-full max-w-lg ">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tráiler</h3>
            <iframe
              className="w-full h-64 rounded-lg"
              src={`https://www.youtube.com/embed/${idYouTube}`}
              title={`Tráiler de ${videoJuego.nombre}`}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
      
          {/* Botón Agregar al carrito */}
          <div className="mt-6">
            <button
              className="btn btn-primary w-full max-w-sm"
              onClick={ handleActualizarCarrito(videoJuego.id)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      
    )
}

export default DetalleVideoJuego;