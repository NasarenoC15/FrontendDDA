import Dominio from "../route";

export const Login = async (email, password) => {
    

    const url = `${Dominio}/administrador/login`;
   try{
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            correo: email,
            contrasena: password
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        return { status: response.status, message: errorData.message || 'Error al iniciar sesión' };
    }

    const data = await response.json();
    localStorage.setItem('admin', JSON.stringify(data));

    return { status: response.status, data };
    }
    catch (error) {
        return { status: 500, message: 'Error del servidor' };
    }
}

    
    


