import Dominio from "../route";

export const obtenerVideoJuegoRed = async (id) => {

    try {
        const response = await fetch(`${Dominio}/videojuego/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, message: errorData.message || 'Error al obtener videojuegos' };
        }
    
        const data = await response.json();

        const dataRed = {
            id: data.id,
            stock: data.stock,
            precio: data.precio,
        }


        return { status: response.status, dataRed };
    } catch (error) {
        return { status: 500, message: 'Error del servidor' };
    }
};