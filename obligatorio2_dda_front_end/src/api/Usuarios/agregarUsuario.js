import Dominio from "../route";

export const agregarUsuario = async (id,nombre,correo,tipoUsuario,adquisicionMembresia) => {
    if (!nombre || !correo || !tipoUsuario) {
        return { status: 400, message: 'Nombre es requerido' };
    }
    const fecha = new Date().toISOString();
    const fechaRegistro =fecha.slice(0,10);
    try {
        if(tipoUsuario === 'Regular'){
            const response = await fetch(`${Dominio}/usuarioRegular`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id,nombre,correo,fechaRegistro })
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { status: response.status, message: errorData.message || 'Error al agregar usuario' };
            }

            const data = await response.json();
            return { status: response.status, data };
        }
        if(tipoUsuario === 'Premium'){
            const response = await fetch(`${Dominio}/usuarioPremium`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id,nombre,correo,adquisicionMembresia,fechaRegistro })
            });
            if (!response.ok) {
                const errorData = await response.json();
                return { status: response.status, message: errorData.message || 'Error al agregar usuario' };
            }

            const data = await response.json();
            return { status: response.status, data };
        }
    } catch (error) {
        return { status: 500, message: 'Error del servidor' };
    }
}
