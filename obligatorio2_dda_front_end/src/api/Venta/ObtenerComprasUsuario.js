import route from "../route";

export const obtenerVentasUsuario = async (id) => {
    try {
        const response = await fetch(`${route}/venta/usuario/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        return { status: 200, data: responseData };
    } catch (error) {
        return error;
    }

}