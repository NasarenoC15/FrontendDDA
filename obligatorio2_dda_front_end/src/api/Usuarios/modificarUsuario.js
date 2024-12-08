import { modificarUsuarioRegular } from "./modificarUsuarioRegular";
import { modificarUsuarioPremium } from "./modificarUsuarioPremium";

export const modificarUsuario = async (nombre, correo, tipoUsuario, adquisicionMembresia, fechaRegistro, id) => {
    if (!nombre || !correo || !tipoUsuario || !fechaRegistro || !id) {
        return { status: 400, message: 'Todos los campos son requeridos' };
    }

    if (tipoUsuario === 'Regular') {
        return await modificarUsuarioRegular(nombre, correo, fechaRegistro, id);
    }

    if (tipoUsuario === 'Premium') {
        return await modificarUsuarioPremium(nombre, correo, adquisicionMembresia, fechaRegistro, id);
    }

    return { status: 400, message: 'Tipo de usuario inválido' };
};