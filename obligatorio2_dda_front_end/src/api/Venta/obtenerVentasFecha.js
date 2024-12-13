import route from "../route";

export const obtenerVentasFecha = async (fecha) => {
    try {
        const response = await fetch(`${route}/venta/fecha/${fecha}`, {
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