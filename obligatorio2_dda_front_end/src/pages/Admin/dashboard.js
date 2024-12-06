'use client';
import React from 'react'
import { useRouter } from 'next/router';
import '../../app/globals.css'; // Verifica la ruta a tu archivo CSS
import 'tailwindcss/tailwind.css'; // Verifica la ruta a tu archivo CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../components/header";

const Dashboard = () => {

    const router = useRouter();

    const handleAgregarVideoJuego = () => {
        router.push('../Productos/altaVideoJuego');
    }

    const handlelistadoDeVideoJuego = () => {
        router.push('../Productos/listadoDeVideoJuego');
    }

    const handleDetalleVideoJuego = () => {
        router.push(`../Productos/Detalle/1`);
    }

    const handleAgregarUsuario = () => {
        router.push('../Usuarios/altaUsuario');
    }

    const handleAgregarCategoria = () => {
        router.push('../Categoria/altaCategoria');
    }

    return (
        <div>
            <Header/>
            <h1>Dashboard</h1>
           <div className='grid grid-cols-1'>
           <table className='mt-4'>
                <thead>
                    <tr>
                        <th>Zona Productos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button onClick={handleAgregarVideoJuego} className="btn btn-primary">Agregar Videojuego</button></td>
                        <td>Modificar Videojuego</td>
                        <td>Eliminar Videojuego</td>
                        <td><button onClick={handlelistadoDeVideoJuego} className="btn btn-primary">Listado de Videojuegos</button></td>
                        <td><button onClick={handleDetalleVideoJuego} className="btn btn-primary">Detalle del Videojuego</button></td>
                    </tr>
                </tbody>
            </table>
            <table className='mt-4'>
                <thead>
                    <tr>
                        <th>Zona Usuarios</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button className='btn btn-secondary' onClick={handleAgregarUsuario}>Agregar Usuario</button></td>
                        <td>Modificar Usuario</td>
                        <td>Eliminar Usuario</td>
                    </tr>
                </tbody>
            </table>
            <table className='mt-4'>
                <thead>
                    <tr>
                        <th>Zona Ventas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ver Ventas</td>
                        <td>Ver Ventas por Usuario</td>

                    </tr>
                </tbody>
            </table>
            <table className='mt-4'>
                <thead>
                    <tr>
                        <th>Zona Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button className='btn btn-danger' onClick={handleAgregarCategoria}>Agregar Categoria</button></td>
                        <td>Modificar Usuario</td>
                        <td>Eliminar Usuario</td>
                    </tr>
                </tbody>
            </table>
           
           </div>
        </div>
    )
}


export default Dashboard