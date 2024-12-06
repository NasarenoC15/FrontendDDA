import Dominio from "../route";

export const obtenerVideoJuegos = async () => {
    try {
        const response = await fetch(`${Dominio}/videojuego`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, message: errorData.message || 'Error al obtener videojuegos' };
        }
        // convert response.data.imagen a imagen utilizable en el front end

        const data = await response.json();

        data.forEach(videojuego => {
            videojuego.imagen = 'data:image/png;base64,' + videojuego.imagen;
        });

        return { status: response.status, data };
    } catch (error) {
        return { status: 500, message: 'Error del servidor' };
    }
};