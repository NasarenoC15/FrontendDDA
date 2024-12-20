'use client';
import React, { useEffect } from 'react'
import { useState } from 'react';
// src/pages/_app.js
import '../../../app/globals.css'; // Verifica la ruta a tu archivo CSS
import 'tailwindcss/tailwind.css'; // Verifica la ruta a tu archivo CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../../components/header";
//import { agregarUsuario } from '../../../../api/Usuarios/agregarUsuario';
import {obtenerUsuario} from '../../../api/Usuarios/obtenerUsuario';
import swal from 'sweetalert2';
import { modificarUsuario } from '@/api/Usuarios/modificarUsuario';
import { useRouter } from 'next/router';

const ModificarUsuario = () => {

    const router = useRouter();
    const { id } = router.query;

   const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [fechaMembresia, setFechaMembresia] = useState('');
    const [fechaRegistro, setFechaRegistro] = useState('');
    const [tipoUsuarioAntiguo, setTipoUsuarioAntiguo] = useState('');

    useEffect(() => {
        const fetchUsuario = async () => {
            const response = await obtenerUsuario(id);
            if(response.data){
                console.log(response.data);
                setNombre(response.data.nombre);
                setCorreo(response.data.correo);
                setFechaRegistro(response.data.fechaRegistro);
                try{
                    setFechaMembresia(response.data.adquisicionMembresia);
                    if(response.data.adquisicionMembresia !== '' && response.data.adquisicionMembresia !== null && response.data.adquisicionMembresia !== undefined){
                        setTipoUsuario('Premium');
                        setTipoUsuarioAntiguo('Premium');
                    }else{
                        setTipoUsuario('Regular');
                        setTipoUsuarioAntiguo('Regular');
                    }
                }
                catch{
                    setFechaMembresia('');
                    setTipoUsuario('Regular');
                }
            }else{
                swal.fire({
                    title: 'Error al obtener el usuario',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                }); 
            }
        }
        fetchUsuario();
    },[]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await modificarUsuario(nombre, correo, tipoUsuario, fechaMembresia, fechaRegistro, id, tipoUsuarioAntiguo);
        if(response.status === 200){
            swal.fire({
                title: 'Usuario agregado',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });

            setNombre('');
            setCorreo('');
            setTipoUsuario('');
            setFechaMembresia('');

        }else{
            swal.fire({
                title: 'Error al agregar el usuario',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleNombre = (e) => {
        setNombre(e.target.value);
    }

    const handleCorreo = (e) => {
        setCorreo(e.target.value);
    }


    const handleTipoUsuario = (e) => {
        setTipoUsuario(e.target.value);
        if(e.target.value === 'Regular'){
            setFechaMembresia('');
        }
    }

    const handleFechaMembresia = (e) => {
        setFechaMembresia(e.target.value);
    }


    return (
        <div><Header/>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <div className='grid grid-cols-5'>
        <img></img><img></img>
          <img src="https://media.istockphoto.com/id/1353479729/es/vector/juego-inal%C3%A1mbrico-joystick-controlador-gamepad-gamepad-inal%C3%A1mbrico-abstracto-dibujo-colorido.jpg?s=612x612&w=0&k=20&c=mp1eadgrTe4Jk9IYvYp28ZQykDB6xi9yHYe9ktunnuk=" alt="Placeholder Image" className="object-cover w-24 h-24 " />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-4 text-center">Modificar Usuario</h1>
      
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={handleNombre}
                placeholder="Nombre"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo</label>
              <input
                type="mail"
                value={correo}
                onChange={handleCorreo}
                placeholder="Correo"
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>


      
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
             <select
                value={tipoUsuario}
                onChange = {handleTipoUsuario}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
                >
                <option value="">Seleccione un tipo de Usuario</option>
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
            </select>

            {tipoUsuario === 'Premium' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Membresia</label>
                    <input
                        type="date"
                        value={fechaMembresia}
                        onChange={handleFechaMembresia}
                        placeholder="Fecha de Membresia"
                        className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
                    />
                </div>    
            )}

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
    )
}

export default ModificarUsuario