import Dominio from "../route";

export const obtenerCategorias = async () => {
    try {
        const response = await fetch(`${Dominio}/categoria`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, message: errorData.message || 'Error al obtener categorías' };
        }

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        return { status: 500, message: 'Error del servidor' };
    }
};