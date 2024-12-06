import Dominio from "../route";

export const obtenerUsuario = async (id) => {
    try {
        // Intentar obtener usuario premium primero
        try {
            const response = await fetch(`${Dominio}/usuarioPremium/${id}`, {
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

        try {
            // Si no es premium o devuelve null, intentar con usuario regular
            const response2 = await fetch(`${Dominio}/usuarioRegular/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response2.ok) {
                const data = await response2.json();
                return { status: response2.status, data };
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