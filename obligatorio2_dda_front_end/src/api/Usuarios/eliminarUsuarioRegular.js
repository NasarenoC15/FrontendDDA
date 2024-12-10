import Dominio from "../route";

export const eliminarUsuarioRegular = async (id) => {
    if (!id) {
        return { status: 400, message: 'Id es requerido' };
    }

        try {
            const response = await fetch(`${Dominio}/usuarioRegular/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                const errorData = await response.json();
                return { status: response.status, message: errorData.message || 'Error al eliminar usuario' };
            }
            return { status: 200};

        } catch (error) {
            return { status: 500, message: 'Error del servidor' };
        }

}
