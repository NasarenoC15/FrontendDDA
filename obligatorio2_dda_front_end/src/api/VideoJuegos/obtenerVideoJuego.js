import Dominio from "../route";

export const obtenerVideoJuego = async (id) => {

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
        // convert response.data.imagen a imagen utilizable en el front end

        const data = await response.json();

        data.imagen = 'data:image/png;base64,' + data.imagen;

        return { status: response.status, data };
    } catch (error) {
        return { status: 500, message: 'Error del servidor' };
    }
};