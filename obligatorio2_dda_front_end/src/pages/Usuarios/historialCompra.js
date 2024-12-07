'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { obtenerHistorialCompra } from '../../../api/Usuarios/obtenerHistorialCompra';
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
                    const response = await obtenerHistorialCompra(id); 
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

    if (loading) {
        return <div>Cargando historial de tu compra</div>;
    }

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1>Historial de Compras del Usuario{id}</h1>
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
                            {historial.map((compra) => (
                                <tr key={compra.id}>
                                    <td>{compra.id}</td>
                                    <td>{compra.producto}</td>
                                    <td>{compra.cantidad}</td>
                                    <td>{compra.fecha}</td>
                                    <td>{compra.total}</td>
                                </tr>
                            ))}
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
