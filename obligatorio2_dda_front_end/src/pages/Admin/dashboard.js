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

    const handlelistadoDeVideoJuegoTabla = () => {
        router.push('../Productos/listadoDeVideoJuegoTabla');
    }

    const handleDetalleVideoJuego = () => {
        router.push(`../Productos/Detalle/1`);
    }


    const handleAgregarUsuario = () => {
        router.push('../Usuarios/altaUsuario');
    }

    const handleModiicarUsuario = () => {
        router.push('../Usuarios/modificarUsuario');

    }

    const handleListarUsuarios = () => {
        router.push('../Usuarios/listadoDeUsuarios');
    }

    const handleAgregarCategoria = () => {
        router.push('../Categoria/altaCategoria');
    }

    return (
        <div>
            <Header/>
            <div>
                <h1 className='text-center mt-4'>Dashboard</h1>
            </div>
           <div className='grid grid-cols-1'>
           <table className='mt-4'>
                <thead>
                    <tr>
                        <th>Zona VideoJuegos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button onClick={handleAgregarVideoJuego} className="btn btn-primary">Agregar Videojuego</button></td>
                        <td><button onClick={handlelistadoDeVideoJuego} className="btn btn-primary">Listado de Videojuegos</button></td>
                        <td><button onClick={handlelistadoDeVideoJuegoTabla} className="btn btn-primary">Listado de Videojuegos Tabla</button></td>
                        <td><button onClick={handleDetalleVideoJuego} className="btn btn-primary">Detalle del Videojuego</button></td>
                    </tr>
                </tbody>
            </table>
            <table className='mt-4'>
                <thead>
                    <tr className=''>
                        <th>Zona Usuarios</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button className='btn btn-secondary' onClick={handleAgregarUsuario}>Agregar Usuario</button></td>
                        <td><button className='btn btn-secondary' onClick={handleModiicarUsuario}>Modificar Usuario</button></td>
                        <td><button className='btn btn-secondary' onClick={handleListarUsuarios}>Listar Usuarios</button></td>
                        <td>Eliminar Usuario</td>
                        <td></td>
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
                         <td>Realizar Venta</td>  {/*la venta debe de usar el carrito y realziar la precompra y luego la compra */}
                        <td>*Devolver Venta*</td>

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
                        <td>Modificar Categoria</td>
                        <td>Eliminar Categoria</td>
                    </tr>
                </tbody>
            </table>
            <table className='mt-4'>
                <thead>
                    <tr>
                        <th>Zona Filtros</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Listar video debajo de cantidad de stock " se puede usar listar videojuegotabla"</td>
                        <td>Listar compras realizadas por un usuario</td>
                        <td>Listar compras en una fecha determinada</td>
                    </tr>
                </tbody>
            </table>
           
           </div>
        </div>
    )
}


export default Dashboard