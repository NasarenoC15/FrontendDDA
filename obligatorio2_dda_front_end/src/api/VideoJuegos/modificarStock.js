import Dominio from "../route";

export const modificarStock = async (id,cantidad) => {
    if (!id || cantidad === undefined || isNaN(cantidad)) {
        return { status: 400, message: 'Todos los datos son requeridos' };
    }

    try {
        const response = await fetch(`${Dominio}/videojuego/stock?id=${id}&stock=${cantidad}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, message: errorData.message || 'Error al modificar stock' };
        }

        const data = await response.json();
        return { status: response.status, data };
    }
    catch (error) {
        return { status: 500, message: 'Error del servidor' };
    }
};