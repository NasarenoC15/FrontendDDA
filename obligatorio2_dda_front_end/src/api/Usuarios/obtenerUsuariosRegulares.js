import Dominio from "../route";

export const obtenerUsuariosRegulares = async () => {
    try {
        // Intentar obtener usuario premium primero
        try {
            const response = await fetch(`${Dominio}/usuarioRegular`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data !== null) {
                    return { status: response.status, data };
                }
            }
        } catch (error) {
            console.error('Error en obtenerUsuario:', error);
        }

        // Si ambas solicitudes fallaron
        return { status: 404, message: 'Usuario no encontrado' };

    } catch (error) {
        console.error('Error en obtenerUsuario:', error);
        return { status: 500, message: 'Error del servidor' };
    }
};