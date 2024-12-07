import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import "../../app/globals.css"; // Verifica la ruta a tu archivo CSS
import "tailwindcss/tailwind.css"; // Verifica la ruta a tu archivo CSS
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header";
import { obtenerVideoJuegos } from "../../api/VideoJuegos/obtenerVideoJuegos";
import { eliminarVideoJuego } from "../../api/VideoJuegos/eliminarVideoJuego";

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


    const handleEliminarVideoJuego = async (id) => {
        const result = await Swal.fire({
            title: '¿Está seguro de eliminar el videojuego?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        });

        if (result.isConfirmed) {
            const response = await eliminarVideoJuego(id);
            if(response.status === 200){
                Swal.fire({
                    title: 'Videojuego eliminado con éxito',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });

               window.location.reload();
            }
        }

    }



    const handleModificarVideoJuego = (id) => {
        router.push(`../Productos/modificarVideoJuego/${id}`);
    }


    return (
        <div>
          <Header />
          <h1 className="mt-3 text-center">Video Juegos</h1>
          <div className="flex ml-20 items-center">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {videoJuegos &&
                  videoJuegos.map((videoJuego) => (
                    <tr key={videoJuego.id}>
                      <td>{videoJuego.id}</td>
                      <td>{videoJuego.nombre}</td>
                    <td><img src={videoJuego.imagen} alt={videoJuego.nombre} width="100" height="100"/></td>
                      <td>{videoJuego.categoria.nombre}</td>
                      <td>{videoJuego.stock}</td>
                      <td>{videoJuego.precio}</td>
                      <td>
                        <button
                          onClick={()=>handleModificarVideoJuego(videoJuego.id)}
                          className="btn btn-primary mr-4"
                        >
                          Modificar VideoJuego
                        </button>
                        <button
                          onClick={() => handleEliminarVideoJuego(videoJuego.id)}
                          className="btn btn-danger"
                        >
                          Eliminar VideoJuego
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      );
};
    
    export default ListadoDeVideoJuego;
    