import { modificarUsuarioRegular } from "../Usuarios/modificarUsuarioRegular";
import { modificarUsuarioPremium } from "../Usuarios/modificarUsuarioPremium";
import { eliminarUsuarioPremium } from "../Usuarios/eliminarUsuarioPremium";
import { eliminarUsuarioRegular } from "../Usuarios/eliminarUsuarioRegular";
import { agregarUsuario } from "./agregarUsuario";

export const modificarUsuario = async (nombre, correo, tipoUsuario, fechaMembresia, fechaRegistro, id, tipoUsuarioAntiguo) => {
    if (!nombre || !correo || !tipoUsuario || !fechaRegistro || !id) {
        return { status: 400, message: 'Todos los campos son requeridos' };
    }
    console.log("Datos a modificar: ", nombre, correo, tipoUsuario,fechaMembresia, fechaRegistro, id, tipoUsuarioAntiguo);
    const adquisicionMembresia = fechaMembresia;
  
    try {
        if(tipoUsuarioAntiguo === 'Premium' && tipoUsuario === 'Regular'){
            const response = await eliminarUsuarioPremium(id);
            console.log("response eliminarUsuarioPremium", response);
            if(response.status !== 200){
                return response;
            }
            const response2 =  await agregarUsuario(id,nombre,correo,tipoUsuario,adquisicionMembresia );
            return response2;
        }

        if(tipoUsuarioAntiguo === 'Regular' && tipoUsuario === 'Premium'){
            const response = await eliminarUsuarioRegular(id);
            console.log("response eliminarUsuarioRegular", response);
            if(response.status !== 200){
                return response;
            }
            const response2 = await agregarUsuario(id,nombre,correo,tipoUsuario,adquisicionMembresia);
            return response2;
        }

        if(tipoUsuarioAntiguo === 'Regular' && tipoUsuario === 'Regular'){
            return await modificarUsuarioRegular(nombre, correo,adquisicionMembresia, fechaRegistro, id);
        }

        if(tipoUsuarioAntiguo === 'Premium' && tipoUsuario === 'Premium'){
           
            return await modificarUsuarioPremium(nombre, correo, adquisicionMembresia, fechaRegistro, id);
        }

        return { status: 400, message: 'Tipo de usuario inválido' };
    } catch (error) {
        return { status: 500, message: 'Error interno del servidor', error: error.message };
    }
};