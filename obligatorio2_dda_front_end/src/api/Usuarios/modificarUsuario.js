import Dominio from "../route";

export const modificarUsuario = async (nombre,correo,tipoUsuario,adquisicionMembresia,fechaRegistro,id) => {
    if (!nombre || !correo || !tipoUsuario || !fechaRegistro || !id) { 
        return { status: 400, message: 'Todo es requerido' };
    }
    try {
        if(tipoUsuario === 'Regular'){
            const response = await fetch(`${Dominio}/usuarioRegular`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre,correo,fechaRegistro,id })
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
                body: JSON.stringify({ nombre,correo,adquisicionMembresia,fechaRegistro,id })
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
