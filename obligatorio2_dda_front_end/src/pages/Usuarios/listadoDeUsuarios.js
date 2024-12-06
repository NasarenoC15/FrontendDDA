'use client';
import react from 'react';
import { useState } from 'react';
import '../../app/globals.css';
import 'tailwindcss/tailwind.css';
import Header from "../../components/header";
import {obtenerUsuariosPremium} from '../../api/Usuarios/obtenerUsuariosPremium';
import {obtenerUsuariosRegulares} from '../../api/Usuarios/obtenerUsuariosRegulares';
import {useRouter} from 'next/router';
import Swal from 'sweetalert2';
import {eliminarUsuarioPremium} from '../../api/Usuarios/eliminarUsuarioPremium';
import {eliminarUsuarioRegular} from '../../api/Usuarios/eliminarUsuarioRegular';

const ListarUsuarios = () => {
    const router = useRouter();

    const [usuariosPremium, setUsuariosPremium] = useState([]);
    const [usuariosRegulares, setUsuariosRegulares] = useState([]);


    

    const handleObtenerUsuariosPremium = async () => {
        const response = await obtenerUsuariosPremium();
        if(response.data){
            setUsuariosPremium(response.data);
            setUsuariosRegulares([]);
        }
    }

    const handleObtenerUsuariosRegulares = async () => {
        const response = await obtenerUsuariosRegulares();
        if(response.data){
            setUsuariosRegulares(response.data);
            setUsuariosPremium([]);
        }
    }

    const handleModificarUsuario = (id) => {
        router.push(`../Usuarios/modificarUsuario/${id}`);
    }

    const handleEliminarUsuarioPremium = async (id) => {
        const result = await Swal.fire({
            title: '¿Está seguro de eliminar el usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        });

        if (result.isConfirmed) {
            const response = await eliminarUsuarioPremium(id);
            if(response.data){
                Swal.fire({
                    title: 'Usuario eliminado con éxito',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });

                const response = await obtenerUsuariosPremium();
                    if(response.data){
                    setUsuariosPremium(response.data);
                    setUsuariosRegulares([]);
                    }
            }
        }

    }
    const handleEliminarUsuarioRegular = async (id) => {
        const result = await Swal.fire({
            title: '¿Está seguro de eliminar el usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        });
    
        if (result.isConfirmed) {
            try {
                const response = await eliminarUsuarioRegular(id);
                if (response.data) {
                    Swal.fire({
                        title: 'Usuario eliminado con éxito',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    const response = await obtenerUsuariosRegulares();
                    if(response.data){
                        setUsuariosRegulares(response.data);
                        setUsuariosPremium([]);
                    }
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error al eliminar usuario',
                    text: error.message,
                    icon: 'error'
                });
            }
        }
    }
    


    return (
        <div>
            <Header/>
           <div className=" text-center ">
                <h1>Listar Usuarios</h1>
                <div className="mt-3">
                    <button onClick={handleObtenerUsuariosPremium} className="btn btn-danger mr-4">Obtener Usuarios Premium</button>
                    <button onClick={handleObtenerUsuariosRegulares} className="btn btn-primary">Obtener Usuarios Regulares</button>
                </div>
                <table className='table ml-20 mt-3'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Tipo Usuario</th>
                            <th>Fecha Registro</th>
                            {usuariosPremium.length > 0 && <th>Fecha Membresia</th>}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosPremium && usuariosPremium.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.correo}</td>
                                <td>Premium</td>
                                <td>{usuario.adquisicionMembresia}</td>
                                <td>{usuario.fechaRegistro}</td>
                                <td>
                                <button className="btn btn-success mr-3" onClick={() => handleModificarUsuario(usuario.id)}>Modificar</button>
                                <button className="btn btn-danger" onClick={() => handleEliminarUsuarioPremium(usuario.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {usuariosRegulares && usuariosRegulares.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.correo}</td>
                                <td>Regular</td>
                                <td>{usuario.fechaRegistro}</td>
                                <td>
                                    <button className="btn btn-success mr-3" onClick={() => handleModificarUsuario(usuario.id)}>Modificar</button>
                                    <button className="btn btn-danger" onClick={() => handleEliminarUsuarioRegular(usuario.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default ListarUsuarios;


