import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../../app/globals.css";
import "tailwindcss/tailwind.css";

import Header from "../../components/header";
import { obtenerVentas } from "@/api/Venta/ObtenerVentas";
import { obtenerUsuario } from "@/api/Usuarios/obtenerUsuario";
import { obtenerAdmin } from "@/api/Administrador/obtenerAdmin";
import { obtenerVentasFecha } from "@/api/Venta/obtenerVentasFecha";

const ListadoDeVentas = () => {
    const router = useRouter();
    const [ventas, setVentas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const fecha = new Date();
    const fechaActual = fecha.toISOString().split("T")[0];
    const [fechaBusqueda, setFechaBusqueda] = useState(fechaActual);

    useEffect(() => {
        const fetchVentas = async () => {
            setLoading(true);
            try {
                const response = await obtenerVentas();
                if (response.status === 200) {
                    setVentas(response.data);
                } else {
                    throw new Error("Error al obtener ventas");
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVentas();
    }, []);

    useEffect(() => {
        const completeVentasData = async () => {
            const updatedVentas = await Promise.all(
                ventas.map(async (venta) => {
                    try {
                        if (typeof venta.persona === "number") {
                            const responseUsuario = await obtenerUsuario(venta.persona);
                            if (responseUsuario.status === 200) {
                                venta.persona = responseUsuario.data;
                            }
                        }
                        if (typeof venta.vendedor === "number") {
                            const responseVendedor = await obtenerAdmin(venta.vendedor);
                            if (responseVendedor.status === 200) {
                                venta.vendedor = responseVendedor.data;
                            }
                        }
                    } catch (err) {
                        setError(err);
                    }
                    return venta;
                })
            );
            setVentas(updatedVentas);
        };

        if (ventas.length > 0) {
            completeVentasData();
        }
    }, [ventas]);

    const handleSubmit = async () => {
        try {
            const fecha = document.getElementById("fecha").value;
            const response = await obtenerVentasFecha(fecha);
            if (response.status === 200) {
                setVentas(response.data);
            } else {
                throw new Error("Error al buscar ventas por fecha");
            }
        } catch (err) {
            setError(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Header />
                <div className="container mx-auto py-6">
                    <h1 className="text-3xl font-bold text-center mb-6">Cargando...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Header />
                <div className="container mx-auto py-6">
                    <h1 className="text-3xl font-bold text-center mb-6">Error: {error.message}</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold text-center mb-6">VideoJuegos Vendidos</h1>
                <div className="flex justify-center mb-4">
                    <div className="flex gap-4">
                        <label className="block">
                            <span>Ingrese Fecha</span>
                            <input
                                id="fecha"
                                type="date"
                                className="border rounded px-2 py-1"
                                max={fechaActual}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <button onClick={handleSubmit} className="btn btn-primary w-44 mb-2">
                        Buscar
                    </button>
                </div>
                <div className="flex justify-center">
                    <table className="table-auto border-collapse border border-gray-400">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 text-center">ID</th>
                                <th className="border px-4 py-2 text-center">VideoJuego</th>
                                <th className="border px-4 py-2 text-center">Cantidad</th>
                                <th className="border px-4 py-2 text-center">Fecha</th>
                                <th className="border px-4 py-2 text-center">Usuario</th>
                                <th className="border px-4 py-2 text-center">Administrador</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((venta) =>
                                venta.carrito.map((item) => (
                                    <tr key={`${venta.id}-${item.videoJuego.id}`}>
                                        <td className="border px-4 py-2 text-center">{venta.id}</td>
                                        <td className="border px-4 py-2 text-center">{item.videoJuego.nombre}</td>
                                        <td className="border px-4 py-2 text-center">{item.cantidad}</td>
                                        <td className="border px-4 py-2 text-center">{venta.fechacompra}</td>
                                        <td className="border px-4 py-2 text-center">{venta.persona.nombre}</td>
                                        <td className="border px-4 py-2 text-center">{venta.vendedor.nombre}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListadoDeVentas;
