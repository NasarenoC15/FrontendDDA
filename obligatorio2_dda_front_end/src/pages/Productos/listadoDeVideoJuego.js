import React from "react";
import { useState, useEffect } from "react";
import { useTokenVerification } from "../../hooks/useTokenVerification";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import "../../app/globals.css"; // Verifica la ruta a tu archivo CSS
import "tailwindcss/tailwind.css"; // Verifica la ruta a tu archivo CSS
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header";
import { obtenerVideoJuegos } from "../../api/VideoJuegos/obtenerVideoJuegos";

const ListadoDeVideoJuego = () => {

    const router = useRouter();

    const [videoJuegos, setVideoJuegos] = useState([]);

    const [carrito, setCarrito] = useState([]);
    

    useEffect(() => {
        const fetchVideoJuegos = async () => {
            const response = await obtenerVideoJuegos();
            if(response.data){
                setVideoJuegos(response.data);
                console.log(response.data);
            }else{
                Swal.fire({
                    title: 'Error al obtener los videojuegos',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        fetchVideoJuegos();

        const carrito = localStorage.getItem('carrito');
        if(carrito){
            setCarrito(JSON.parse(carrito));
        }
    },[]);

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

    const handleVerDetalles = (id) => {
        router.push(`../Productos/Detalle/${id}`);
    }


  return (
    <div>
        <Header />
      <h1 className="mt-3 text-center">Video Juegos</h1>
      <div className="grid grid-cols-4">
       {
        videoJuegos && videoJuegos.map((videoJuego) => (
            <div key={videoJuego.id} className="m-4">
            <div className="card card-compact bg-base-100 w-96 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <figure>
                <img
                  src={videoJuego.imagen}
                  alt={videoJuego.nombre}
                  className="rounded-t-lg h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold text-gray-800">
                  {videoJuego.nombre}
                </h2>
                <p className="text-gray-600 text-sm">{videoJuego.descripcion}</p>
                <div className="card-actions flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-outline text-black">{videoJuego.categoria.nombre}</span>
                  <span className="badge badge-outline text-black">
                    {"Stock: " + videoJuego.stock}
                  </span>
                </div>
                <div className="flex justify-between mt-4">
                <button
                    className="btn btn-secondary btn-sm w-1/2  mr-2"
                    onClick={(e)=> handleVerDetalles(videoJuego.id)}
                  >
                    Ver +
                  </button>
                  <button
                    className="btn btn-primary btn-sm w-1/2 ml-2"
                    onClick={ handleActualizarCarrito(videoJuego.id)}
                  >
                    Agregar al carrito
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          
            
        ))
       }
        
        
      </div>
    </div>
  );
};

export default ListadoDeVideoJuego;