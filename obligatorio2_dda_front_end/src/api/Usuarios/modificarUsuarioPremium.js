import Dominio from "../route";

export const modificarUsuarioPremium = async (nombre, correo, adquisicionMembresia, fechaRegistro, id) => {
    if (!nombre || !correo || !adquisicionMembresia || !fechaRegistro || !id) {
        return { status: 400, message: 'Todos los campos son requeridos' };
    }

    try {
        const response = await fetch(`${Dominio}/usuarioPremium`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correo, adquisicionMembresia, fechaRegistro, id })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { status: response.status, message: errorData.message || 'Error al modificar usuario Premium' };
        }

        const data = await response.json();
        return { status: response.status, data };

    } catch (error) {
        return { status: 500, message: 'Error del servidor' };
    }
};