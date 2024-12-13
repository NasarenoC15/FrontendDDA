import route from "../route";

export const obtenerAdmin = async (id) => {

    try {
        const response = await fetch(`${route}/administrador/${id}`, {
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