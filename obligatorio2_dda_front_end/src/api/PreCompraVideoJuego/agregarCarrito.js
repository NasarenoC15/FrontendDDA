import Dominio from "../route";
import { obtenerVideoJuegoRed } from "../VideoJuegos/obtenerVideoJuegoRed";

export const agregarCarrito = async (carrito, idventa) => {
    if (!Array.isArray(carrito) || carrito.length === 0 || !idventa) {
        return { status: 400, message: 'Todos los campos son requeridos y el carrito debe contener al menos un videojuego' };
    }

    try {
        await Promise.all(carrito.map(async (item) => {
            if (!item.id || !item.cantidad) {
                throw { status: 400, message: 'Cada videojuego debe tener un id y una cantidad válida' };
            }

            const videojuego = await obtenerVideoJuegoRed(item.id);
            console.log(videojuego);
            if (videojuego.status !== 200) {
                throw { status: videojuego.status, message: `Error al obtener videojuego con id ${item.id}` };
            }
            if (videojuego.dataRed.stock < item.cantidad) {
                throw { status: 400, message: `No hay stock suficiente para el videojuego con id ${item.id}` };
            }

            const precioFinal = videojuego.dataRed.precio * item.cantidad;
            const response = await fetch(`${Dominio}/precompra`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    venta_id: idventa,
                    videoJuego: { id: item.id },
                    cantidad: item.cantidad,
                    precioFinal,
                    precioIndividual: videojuego.dataRed.precio
                })
            });

            if (!response.ok) {
                throw { status: response.status, message: 'Error al realizar la precompra' };
            }
        }));

        return { status: 200, message: 'Carrito agregado correctamente' };
    } catch (error) {
        return error;
    }
};