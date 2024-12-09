'use client';
import React from 'react';
import { useRouter } from 'next/router';
import '../../app/globals.css'; // Verifica la ruta a tu archivo CSS
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../components/header";

const Dashboard = () => {

    const router = useRouter();

    const handleAgregarVideoJuego = () => router.push('../Productos/altaVideoJuego');
    const handlelistadoDeVideoJuego = () => router.push('../Productos/listadoDeVideoJuego');
    const handlelistadoDeVideoJuegoTabla = () => router.push('../Productos/listadoDeVideoJuegoTabla');
    const handleDetalleVideoJuego = () => router.push(`../Productos/Detalle/1`);

    const handleAgregarUsuario = () => router.push('../Usuarios/altaUsuario');
    const handleListarUsuarios = () => router.push('../Usuarios/listadoDeUsuarios');

    const handleAgregarCategoria = () => router.push('../Categoria/altaCategoria');
    const handleListarCategorias = () => router.push('../Categoria/listadoDeCategorias');

    const handleAgregarVenta = () => router.push('../Venta/altaVenta');


    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold text-center mb-6">Panel de control Administrador</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Zona VideoJuegos */}
                    <div className="bg-white shadow-lg text-center rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Zona VideoJuegos</h2>
                        <button onClick={handleAgregarVideoJuego} className="btn btn-primary w-full mb-2">Agregar Videojuego</button>
                        <button onClick={handlelistadoDeVideoJuego} className="btn btn-primary w-full mb-2">Listado de Videojuegos</button>
                        <button onClick={handlelistadoDeVideoJuegoTabla} className="btn btn-primary w-full mb-2">Listado de Videojuegos Tabla</button>
                        <button onClick={handleDetalleVideoJuego} className="btn btn-primary w-full">Detalle del Videojuego</button>
                    </div>

                    {/* Zona Usuarios */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl  text-center font-semibold mb-4">Zona Usuarios</h2>
                        <button onClick={handleAgregarUsuario} className="btn btn-secondary w-full mb-2">Agregar Usuario</button>
                        <button onClick={handleListarUsuarios} className="btn btn-secondary w-full">Listar Usuarios</button>
                    </div>

                    {/* Zona Categoría */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl text-center font-semibold mb-4">Zona Categoría</h2>
                        <button onClick={handleAgregarCategoria} className="btn btn-danger w-full mb-2">Agregar Categoría</button>
                        <button onClick={handleListarCategorias} className="btn btn-danger w-full">Listado de Categorías</button>
                    </div>

                    {/* Zona Ventas */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl text-center font-semibold mb-4">Zona Ventas</h2>
                        <button onClick={handleAgregarVenta} className="btn btn-danger w-full mb-2">Agregar Venta</button>
                        <p className="text-gray-600 mb-2">Realizar Venta</p>
                        <p className="text-gray-600">*Devolver Venta*</p>
                    </div>

                    {/* Zona Filtros */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl text-center font-semibold mb-4">Zona Filtros</h2>
                        <p className="text-gray-600">Listar compras en una fecha determinada</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;