import Dominio from "../route";

export const agregarVideoJuego = async (nombre,categoriaSeleccionada,descripcion,precio,cantidad,imagenBase64,url) => {
    if (!nombre || !categoriaSeleccionada || !descripcion || !precio || !cantidad || ! imagenBase64|| ! url) {
        return { status: 400, message: 'Todos los datos son requeridos' };
    }

    try {
        const response = await fetch(`${Dominio}/videojuego`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre ,descripcion,imagen:imagenBase64, categoria:{id:categoriaSeleccionada},  precio, stock:cantidad,trailer:url})
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