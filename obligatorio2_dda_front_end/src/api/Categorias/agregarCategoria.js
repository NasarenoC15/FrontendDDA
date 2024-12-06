import Dominio from "../route";

export const agregarCategoria = async (nombre) => {
    if (!nombre) {
        return { status: 400, message: 'Nombre es requerido' };
    }

    try {
        const response = await fetch(`${Dominio}/categoria`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, message: errorData.message || 'Error al agregar categoría' };
        }

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        return { status: 500, message: 'Error del servidor' };
    }
};
