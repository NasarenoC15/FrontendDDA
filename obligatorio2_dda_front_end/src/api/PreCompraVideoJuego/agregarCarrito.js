import Dominio from "../route";
import { obtenerVideoJuegoRed } from "../VideoJuegos/obtenerVideoJuegoRed";
import { modificarStock } from "../VideoJuegos/modificarStock";

export const agregarCarrito = async (carrito, idventa,usuario) => {
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
            const precioDescuento = usuario == "Premium" ? precioFinal * 0.8 : precioFinal;
            const response = await fetch(`${Dominio}/precompra`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    venta_id: idventa,
                    videoJuego: { id: item.id },
                    cantidad: item.cantidad,
                    precioFinal:precioDescuento,
                    precioIndividual: videojuego.dataRed.precio
                })
            });
            const cantidad = videojuego.dataRed.stock - item.cantidad;
            const id = item.id;
            console.log("id",id,"cantidad",cantidad);
            const reducirStock = await modificarStock(id, cantidad);
            if (reducirStock.status !== 200) {
                throw { status: reducirStock.status, message: reducirStock.message || 'Error al reducir stock' };
            }
            const responseData = await response.json();
            if (!response.ok) {
                throw { status: response.status, message: responseData.message || 'Error al realizar la precompra' };
            }
        }));

        return { status: 200, message: 'Carrito agregado correctamente' };
    } catch (error) {
        return error;
    }
};