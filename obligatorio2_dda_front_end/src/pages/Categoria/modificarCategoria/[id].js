"use client";
import React, { useState, useEffect } from "react";
import "../../../app/globals.css";
import "tailwindcss/tailwind.css";
import Header from "../../../components/header";
import { obtenerCategorias } from "../../../api/Categorias/obtenerCategorias";
import { modificarCategoria } from "../../../api/Categorias/modificarCategoria";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { obtenerCategoria } from "@/api/Categorias/obtenerCategoria";

const ModificarCategoria = () => {

    const router = useRouter();
    const {id} = router.query;

  const [nombre, setNombre] = useState("");


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
    const fetchCategoria = async () => {
        const response = await obtenerCategoria(id);
        if(response.data){
            setNombre(response.data.nombre);
           
        }else{
            Swal.fire({
                title: 'Error al obtener el Categoria',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    fetchCategorias();
    fetchCategoria();
  }, []);

  const handleNombre = (e) => {
    setNombre(e.target.value);
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
   

    
   
    const response = await modificarCategoria(id,nombre);

    if (response.status ===200) {
      Swal.fire({
        title: "Categoria modificado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setNombre("");
  
    } else {
      Swal.fire({
        title: "Error al agregar el Categoria",
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
                placeholder="Nombre del Categoria"
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

export default ModificarCategoria;
