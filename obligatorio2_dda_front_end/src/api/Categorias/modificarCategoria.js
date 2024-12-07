import Dominio from "../route";

export const modificarCategoria = async (id, nombre) => {
    if (!id || !nombre ) {
        return { status: 400, message: 'Todos los datos son requeridos' };
    }

    try {
        const response = await fetch(`${Dominio}/categoria`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, nombre})
        });


        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        return { status: 500, message: 'Error del servidor' };
    }
};