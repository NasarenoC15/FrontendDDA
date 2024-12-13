'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {obtenerVentasUsuario} from '../../../api/Venta/ObtenerComprasUsuario';
import Header from '../../../components/header';

const HistorialCompra = () => {
    const router = useRouter();
    const { id } = router.query; 
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchHistorial = async () => {
                try {
                    const response = await obtenerVentasUsuario(id); 
                    if (response.data) {
                        setHistorial(response.data);
                    }
                } catch (error) {
                    console.error('Error al obtener el historial de compra:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchHistorial();
        }
    }, [id]);


    console.log(historial);

    if (loading) {
        return <div>Cargando historial de tu compra</div>;
    }

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1>Historial de Compras del Usuario {historial.length>0 && historial[0].persona.nombre}</h1>
                {historial.length > 0 ? (
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>ID Compra</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Fecha</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {historial.map((venta) =>
                                venta.carrito.map((item) => (
                                    <tr key={`${venta.id}-${item.videoJuego.id}`}>
                                        <td className="border px-4 py-2 text-center">{venta.id}</td>
                                        <td className="border px-4 py-2 text-center">{item.videoJuego.nombre}</td>
                                        <td className="border px-4 py-2 text-center">{item.cantidad}</td>
                                        <td className="border px-4 py-2 text-center">{venta.fechacompra}</td>
                                        <td className="border px-4 py-2 text-center">{item.precioFinal} U$S</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay historial de compras disponible</p>
                )}
            </div>
        </div>
    );
};

export default HistorialCompra;
